const express = require('express')
const { MedicalClaim, HealthPolicy, ClaimStaff, Staff } = require('../models')
const { NEW_CLAIM_SUBMITTED } = require('../eventDispatcher/events')
const { dispatchEvent } = require('../eventDispatcher/amqp')
const router = express.Router()

router.get(['/', '/classificationstatus/:classificationStatus'], async (req, res) => {
  try {
    const { classificationStatus = '' } = req.params
    const { offset=0, limit=50 } = req.query
    const whereClause = classificationStatus? {
      classificationStatus: classificationStatus
    } : {}

    const claims = await MedicalClaim.findAll({
      where: whereClause,
      offset: parseInt(offset),
      limit: parseInt(limit),
      include: [HealthPolicy, {
        model: ClaimStaff,
        include: Staff
      }]
    })
    return res.json({
      total: await MedicalClaim.count({
        where: whereClause
      }),
      offset: offset,
      limit: limit,
      data: claims
    })
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.get('/:claimNo', async (req, res) => {
  try {
    const { claimNo } = req.params
    const claim = await MedicalClaim.findByPk(claimNo, {
      include: [HealthPolicy, {
        model: ClaimStaff,
        include: Staff
      }]
    })

    if (!claim) {
      res.status(404)
      return res.send('Not found')
    }

    return res.json(claim)
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.post('/', async (req, res) => {
  try {
    const {
      MainClaimNo = null,
      ClaimType = '',
      PolicyNo = null,
      DateOcc = new Date(),
      EffDate = new Date(),
      ExpDate = new Date(),
      Rider = null,
      HospitalType = null,
      Specialist = null,
      Specialty = null,
      DiagnosisCode = null,
      RefundAmount = null,
      HRN = null,
      SubType = null, //FS = first submission, AM = amendment, CA=Cancel  
      BillCategory = null, //'IN=Inpatient, PP=PreHospitalization/PostHospitalization OU=Outpatient, DY=DayPatient'
      FinalPayout = 0,
      HospitalCode = null,
      RiderPrdtCode = null,
      RiderEffDate = null,
      OtherDiagnosis = null,
      RiderTypeID = null,
      PanelTypeID = null,
      TotalExp = 0,
      Status = 1, // [note: '1=Pending, 2=Approved, 3=Settled, 4=Rejected, 5=Cancelled']
      ClaimRemark = null,
      AttachUrl = null,
      PolicyHolderID = null,
      PolicyHolderName = null,
      InsuredID = null,
      InsuredName = null,
      PoolID = null,
      PolicyDuration = null,
      AssignDate = null,
      CloseDate = null,
      AutoClaim = 1,
      ClassificationReason = null,
      DeductibleAmount = 0,
      CopayAmount = 0
    } = req.body

    // validation
    if (!await HealthPolicy.findByPk(PolicyNo)) {
      res.status(400)
      return res.json({
        errors: 'Invalid policy number'
      })
    }

    const claim = new MedicalClaim({
      MainClaimNo, ClaimType, PolicyNo, DateOcc, EffDate, ExpDate, Rider,
      HospitalType, Specialist, Specialty, DiagnosisCode, RefundAmount,
      HRN, SubType, BillCategory, FinalPayout, HospitalCode, RiderPrdtCode, RiderEffDate,
      OtherDiagnosis, RiderTypeID, PanelTypeID, TotalExp, Status, ClaimRemark, AttachUrl,
      PolicyHolderID, PolicyHolderName, InsuredID, InsuredName, PoolID, PolicyDuration,
      AssignDate, CloseDate, AutoClaim, ClassificationReason, DeductibleAmount, CopayAmount
    })

    await claim.save()
    claim.reload()

    dispatchEvent(NEW_CLAIM_SUBMITTED, JSON.stringify({
      ClaimNo: claim.ClaimNo
    }))

    return res.json(claim)
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.patch('/:claimNo', async (req, res) => {
  try {
    const { claimNo } = req.params
    const claim = await MedicalClaim.findByPk(claimNo)

    if (!claim) {
      res.status(404)
      return res.send('Not found')
    }

    Object.keys(req.body).forEach(attr => {
      claim.set(attr, req.body[attr])
    })

    await claim.save()
    await claim.reload()
    return res.json(claim)

  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.put('/assign/:claimNo/to/:staffID', async (req, res) => {
  try {
    const { claimNo, staffID } = req.params
    const claim = await MedicalClaim.findByPk(claimNo, {
      include: [HealthPolicy, {
        model: ClaimStaff,
        include: Staff
      }]
    })

    if (!claim) {
      res.status(400)
      return res.send('Invalid claim')
    }

    const staff = await Staff.findByPk(staffID)

    if (!staff) {
      res.status(400)
      return res.send('Invalid staff')
    }

    const existingAssignment = await ClaimStaff.findOne({
      ClaimNo: claim.ClaimNo
    })

    if (existingAssignment) {
      res.status(400)
      return res.send('Claim already assigned')
    }

    const claimStaff = new ClaimStaff({
      StaffID: staff.ID,
      ClaimNo: claim.ClaimNo,
      PolicyNo: claim.PolicyNo
    })

    await claimStaff.save()

    await claim.reload()
    return res.json(claim)

  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

module.exports = {
  router
}