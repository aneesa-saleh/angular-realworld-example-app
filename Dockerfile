FROM cypress/base:18.16.1
USER root
RUN apt-get -y update
RUN apt-get -y install curl