const express = require('express')
const sequelize = require('sequelize')
const { HealthPolicy, ProductPlan, PolicyBenefit, MedicalClaim } = require('../models')
const router = express.Router()

const modelIncludeList = [{
  model: ProductPlan,
  include: PolicyBenefit
}, {
  association: 'RiderPlan',
  include: PolicyBenefit
}, {
  model: MedicalClaim,
  attributes: ['ClaimNo', 'PolicyNo', 'Status', 'AutoClaim', 'CreatedDate', 'TotalExp', 'ClassificationReason']
}]

router.get('/', async (req, res) => {
  const { offset=0, limit=50 } = req.query
  try {
    const policies = await HealthPolicy.findAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      include: modelIncludeList
    })
    return res.json({
      total: await HealthPolicy.count(),
      offset: offset,
      limit: limit,
      data: policies
    })
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.get('/sampleids', async (req, res) => {
  const { offset=0, limit=50 } = req.query
  try {
    const ids = await HealthPolicy.findAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      attributes: ['InsuredID'],
      order: [
        [sequelize.literal('rand()')]
      ]
    }).map(policy => policy.InsuredID)

    return res.json({
      total: await HealthPolicy.count(),
      offset: offset,
      limit: limit,
      data: ids
    })
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.get('/:policyNo', async (req, res) => {
  const { policyNo } = req.params
  try {
    const policy = await HealthPolicy.findByPk(policyNo, {
      include: modelIncludeList
    })
    if (!policy) {
      res.status(404)
      return res.send('Not found')
    }

    return res.json(policy)
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

router.get('/byinsuredid/:insuredId', async (req, res) => {
  const { insuredId } = req.params
  try {
    const policy = await HealthPolicy.findOne({
      where: {
        InsuredID: insuredId
      },
      include: modelIncludeList
    })
    if (!policy) {
      res.status(404)
      return res.send('Not found')
    }

    return res.json(policy)
  } catch (e) {
    console.error(e)
    res.status(500)
    return res.send('An unexpected error occurred')
  }  
})

module.exports = {
  router
}