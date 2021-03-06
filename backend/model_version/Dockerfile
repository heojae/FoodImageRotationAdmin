FROM python:3.8.3-slim

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt

COPY ./ ./
RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]

EXPOSE 50053

CMD ["python", "app.py"]
