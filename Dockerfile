FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
ENV PORT=3001
EXPOSE 3001
CMD ["serve", "-s", "build"]
