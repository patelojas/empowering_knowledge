FROM python:3

RUN pip install --upgrade pip
RUN pip --version

RUN pip install selenium

FROM node

RUN apt-get update
RUN apt-get -y install vim 
RUN apt-get -y install tmux 

COPY . /nodejs
WORKDIR /nodejs

RUN cd /nodejs && npm install 
RUN npm install react
RUN npm install --global mocha
RUN npm install reactstrap
RUN npm install react-twitter-widgets
RUN npm install react-scripts
RUN npm install react-dom
RUN npm install react-router-dom

CMD bash

#CMD ["npm", "start"]
