FROM node:20-slim AS build
WORKDIR /app
COPY nefra-deploy/package*.json ./
RUN npm install
COPY nefra-deploy/ .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY nefra-deploy/server.js ./server.js
COPY nefra-deploy/package.json ./package.json
EXPOSE 3000
CMD ["node", "server.js"]
