FROM node:alpine3.12
LABEL author="Sven Jambor"

WORKDIR /root/endoexport
ENV NPM_CONFIG_LOGLEVEL info
# set timezone so that tzdata doesn't prompt interactively
ENV TZ=Europe/Amsterdam
ENV ENDO_USER="endouser@yourprovider.com"
ENV ENDO_PASS="secretEndomondoPassword"
ENV ENDO_PATH="/root/endoexport/gpx"

#rest-api-handler, also by Michal Ozogan (fabulator) changes needed to keep endomondo-api-handler running
RUN npm install --save cross-fetch endomondo-api-handler rest-api-handler
ADD https://raw.githubusercontent.com/svenjambor/endoexport/main/app.js .

ENTRYPOINT ["node","app.js"]
