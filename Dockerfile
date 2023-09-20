# Dockerfile used to run cypress tests in jenkins
# Not specifying browsers due to issues installing them on linux/arm64

ARG NODE_VERSION="18.17.1"
ARG CYPRESS_VERSION="12.17.4"

FROM cypress/factory:3.1.0

USER root
RUN apt-get -y update
RUN apt-get -y install curl

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN $(npm bin)/cypress verify