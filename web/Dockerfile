FROM node:22-alpine as base
ARG AUTH_ENABLED=0
ARG REDIRECT_URI=https://proxy-mercury-dev.radix.equinor.com
ARG APP_INSIGHT_CON_STRING=""
# Azure AD requires a scope.
ENV REACT_APP_AUTH=$AUTH_ENABLED
ENV REACT_APP_AUTH_REDIRECT_URI=$REDIRECT_URI
ENV REACT_APP_APP_INSIGHT_CON_STRING=$APP_INSIGHT_CON_STRING

WORKDIR /code
COPY ./ ./
RUN yarn install

FROM base as development
CMD ["yarn", "start"]

FROM base as build
RUN yarn build

FROM node:18-alpine as prod
RUN npm install -g serve
COPY --from=build /code/build /code/build
USER 1000
CMD ["serve", "--single", "/code/build", "--listen", "3000"]
EXPOSE 3000
