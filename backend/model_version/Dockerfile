FROM python:3.8.3-slim

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY ./ ./

EXPOSE 50053

CMD ["python", "app.py"]
