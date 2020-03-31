FROM python:3

RUN apt-get update

RUN apt-get -y install libboost-all-dev
RUN apt-get -y install libgmp-dev
RUN apt-get -y install vim
RUN apt-get -y install tmux 

RUN pip install --upgrade pip
RUN pip --version

RUN pip install black

RUN pip install Flask
RUN pip install Flask-SQLAlchemy
RUN pip install Flask-restless
RUN pip install SQLAlchemy
RUN pip install pymysql
RUN pip install flask_cors

RUN pip install pandas
RUN pip install requests

COPY . /app

# CMD bash
CMD [ "python3", "__init__.py" ] 
