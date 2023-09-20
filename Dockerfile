# Dockerfile used to run cypress tests in jenkins

ARG NODE_VERSION="18.17.1"
ARG CYPRESS_VERSION="12.17.4"
ARG CHROME_VERSION='107.0.5304.121-1'
ARG EDGE_VERSION='100.0.1185.29-1'
ARG FIREFOX_VERSION='107.0'

FROM cypress/factory:3.1.0

USER root
RUN apt-get -y update
RUN apt-get -y install curl