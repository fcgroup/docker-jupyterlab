FROM jupyter/pyspark-notebook:latest

USER root

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
  && apt-get update \
  && apt-get install -y nodejs

USER ${NB_UID}

RUN npm install -g ijavascript \
  && ijsinstall \ 
  && npm install -g jasmine
