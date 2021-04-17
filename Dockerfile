FROM python:3.8-buster

WORKDIR /gobarbra

COPY . .

ENV PYTHONPATH ./backend/app

RUN apt update

RUN apt install ffmpeg -y

RUN pip3 install fastapi uvicorn tortoise-orm passlib gtts pyjwt python-multipart bcrypt pydub asyncpg

#CMD ["uvicorn", "backend.app.gobarbra3:app", "--host", "0.0.0.0", "--port", "8000"]
