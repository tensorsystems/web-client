# Copyright 2021 Kidus Tiliksew

# This file is part of Tensor EMR.

# Tensor EMR is free software: you can redistribute it and/or modify
# it under the terms of the version 2 of GNU General Public License as published by
# the Free Software Foundation.

# Tensor EMR is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# -- BUILD --
FROM node:14-alpine as build

ARG APP_SERVER_URL 
ARG APP_ELASTICSEARCH_URL

WORKDIR /usr/src/app

COPY package* ./
COPY . .

RUN npm install
RUN REACT_APP_SERVER_URL=${APP_SERVER_URL} \ 
  REACT_APP_ELASTICSEARCH_URL=${APP_ELASTICSEARCH_URL} \ 
  npm run build

# -- RELEASE --
FROM nginx:stable-alpine as release

COPY --from=build /usr/src/app/build /usr/share/nginx/html
# copy .env.example as .env to the release build
COPY --from=build /usr/src/app/.env.example /usr/share/nginx/html/.env
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]