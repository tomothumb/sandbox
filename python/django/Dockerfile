FROM python:3-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/