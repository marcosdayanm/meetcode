# Alpine es una versión muy ligera de Linux, es muy recomendable para contenedores, pero acá vamos a usar la normal, sino sería FROM node:20.12.1-alpine

FROM node:20.12.1-alpine
WORKDIR /app
COPY . .
RUN npm ci  --omit=dev 
RUN npm run build
CMD ["npm", "start"]
