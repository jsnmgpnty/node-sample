# dev build image
FROM node:15.4.0-alpine3.10 AS development
WORKDIR /usr/src/app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build

# prod image
FROM node:15.4.0-alpine3.10 AS production
WORKDIR /usr/src/app
COPY . .
# cleanup unnecessary files to reduce image size
RUN npm install --frozen-lockfile
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/main"]
