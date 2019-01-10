#!/usr/bin/env bash

PORT=22
USERNAME=xsnapp
ADDRESS=xsnapp.com
APP_DIR=/home/${USERNAME}/apps/frontend

yarn install
yarn build:prod
ssh -p ${PORT} -l ${USERNAME} ${ADDRESS} "mkdir ${APP_DIR} -p"
rsync -av ./dist ${USERNAME}@${HOSTNAME}:${APP_DIR}