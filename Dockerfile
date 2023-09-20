# Dockerfile used to run cypress tests in jenkins
# Not specifying browsers due to issues installing them on linux/arm64

FROM cypress/base:18.16.1

# install curl
USER root
RUN apt-get -y update
RUN apt-get -y install curl

# set up pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate