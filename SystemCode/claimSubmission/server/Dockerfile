# USE official node as base
FROM python:3.7

# Set the working directory to /app
WORKDIR /app

# install dependent linux libraries
# RUN apk update && apk add --no-cache linux-headers gcc g++ libc-dev geos-dev

# pip install
ADD ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Copy server contents into the container at /app
COPY ./ /app
RUN chmod +x /app/start.sh

# run
CMD ./start.sh