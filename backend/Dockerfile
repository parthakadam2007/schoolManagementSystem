# backend/Dockerfile

FROM node:20-alpine

# Create a non-root user
RUN addgroup app && adduser -S -G app app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Set ownership to the non-root user
RUN chown -R app:app /usr/src/app

USER app

EXPOSE 8000

CMD ["node", "app.js"]
