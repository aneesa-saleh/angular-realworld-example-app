# Args are defined in the Dockerfile before the FROM command.
# Using these args will cause an image to be created with node (default version is 16.18.1), chrome, firefox and edge.
ARG NODE_VERSION="18.17.1"
ARG CYPRESS_VERSION="12.17.4"
ARG CHROME_VERSION='116.0.5845.187'
ARG EDGE_VERSION='117.0.2045.35'
ARG FIREFOX_VERSION='109.0.1'

FROM cypress/factory

USER root
RUN apt-get -y update
RUN apt-get -y install curl