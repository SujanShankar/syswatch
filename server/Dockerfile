FROM node:22

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    pip3 install psutil --break-system-packages

COPY server/package*.json ./

RUN npm install

COPY server .

EXPOSE 5000

CMD ["npm", "run", "dev"]