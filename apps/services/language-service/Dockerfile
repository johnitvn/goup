# Install dependencies only when needed
FROM docker.io/node:20-alpine AS deps
RUN apk add --no-cache dumb-init grpcurl
WORKDIR /usr/src/app
COPY dist/apps/services/language-service/package*.json ./
RUN npm install --omit=dev


FROM gcr.io/distroless/nodejs20 AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app
COPY --from=deps /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=deps /usr/bin/grpcurl /usr/bin/grpcurl
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/apps/services/language-service .
EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD [ "/nodejs/bin/node", "--no-warnings" , "main.js"]
