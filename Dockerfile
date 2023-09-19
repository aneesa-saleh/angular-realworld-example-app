FROM cypress/base:18.16.1
USER root
RUN apt-get -y update; apt-get -y install curl
RUN npm install
RUN $(npm bin)/cypress install
RUN $(npm bin)/cypress verify