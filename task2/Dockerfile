FROM node:12.14.1
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm","start"]

#  sudo docker build . -t web
#  sudo docker run -it -p 3010:3000 web(running on port 3010)