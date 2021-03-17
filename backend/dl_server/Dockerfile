FROM python:3.8.3-slim

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install --no-cache-dir torch==1.5.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip3 install --no-cache-dir torchvision==0.6.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip3 install --no-cache-dir torchsummary==1.5.1

COPY ./ ./
RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]

EXPOSE 50052

CMD ["python", "app.py"]
