FROM node:alpine3.12
LABEL author="Sven Jambor"

WORKDIR /root/endoexport
ENV NPM_CONFIG_LOGLEVEL info
# set timezone so that tzdata doesn't prompt interactively
ENV TZ=Europe/Amsterdam
ENV ENDO_USER="endouser@yourprovider.com"
ENV ENDO_PASS="secretEndoPassword"
ENV ENDO_PATH="/root/endoexport/gpx"

RUN npm install --save endomondo-api-handler cross-fetch rest-api-handler
COPY app.js .

#ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT ["node","app.js"]
