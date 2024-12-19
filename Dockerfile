FROM node:20.11.0-alpine AS prod
ENV NODE_ENV production
ENV PORT 3000

COPY --chown=node:node /apps/constructor/.next/standalone /app

WORKDIR /app/apps/constructor

USER node
EXPOSE 3000

CMD ["node", "server.js"]
