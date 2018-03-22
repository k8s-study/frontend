FROM node:8

ENV NODE_ENV production

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
WORKDIR /usr/src/app
RUN yarn config set cache ~/.yarn-cache
RUN yarn install

COPY . /usr/src/app
RUN yarn run build
EXPOSE 3000
CMD yarn start
