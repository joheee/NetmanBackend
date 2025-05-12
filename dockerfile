###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As development
WORKDIR /usr/src/app
RUN apk add --no-cache openssl
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma 
RUN npm ci
COPY --chown=node:node . .             
RUN npx prisma generate
USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As build
WORKDIR /usr/src/app
RUN apk add --no-cache openssl
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As production
RUN apk add --no-cache openssl
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/public ./public
CMD ["node", "dist/src/main.js"]
