FROM node:16.13.0-alpine3.14 AS appbuild

WORKDIR /usr/app

COPY . .

RUN npm config set strict-ssl false
RUN npm cache clean --force
RUN npm install

RUN rm -f .npmrc


# This build takes the build 
FROM node:16.13.0-alpine3.14

WORKDIR /usr/app

RUN npm i nodemon -g

# Create a user group 'appgroup'
RUN addgroup -S appgroup
# Create a user 'appuser' under 'appgroup'
RUN adduser -S -D -h /usr/app appuser appgroup

# Chown all the files to the app user.
RUN chown -R appuser:appgroup /usr/app

USER appuser

COPY --from=appbuild /usr/app /usr/app

ENV PORT=3000

HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:3000 || exit 1

EXPOSE 3000

CMD npm run schema:create && \
    npm run migration:run && \
    npm run start   
