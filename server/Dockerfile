FROM python:3.8-slim

WORKDIR /app

ARG PORT=port

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000