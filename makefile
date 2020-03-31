docker-backend:
	sudo docker run -it -v $(shell pwd):/usr/cs373-web/ -w /usr/cs373-web/backend/app empoweringknowledge/backend

docker-frontend:
	sudo docker run -it -v $(shell pwd):/usr/cs373-web/ -w /usr/cs373-web/frontend/empoweringknowledge empoweringknowledge/frontend

build-backend:
	sudo docker build -t empoweringknowledge/backend backend/.
	sudo docker push empoweringknowledge/backend:latest 

build-frontend:
	sudo docker build -t empoweringknowledge/frontend frontend/.
	sudo docker push empoweringknowledge/frontend:latest 

test-backend:
	cd backend && python3 tests.py

pull:
	sudo docker pull empoweringknowledge/frontend
	sudo docker pull empoweringknowledge/backend
