FROM cypress/base:18.16.1
USER root
RUN pwd
RUN ls
RUN apt-get -y update; apt-get -y install curl
WORKDIR /
RUN npm install
RUN $(npm bin)/cypress install
RUN $(npm bin)/cypress verify