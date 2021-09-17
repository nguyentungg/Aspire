FROM python:3.9.2
WORKDIR /home/backend
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY ./backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5000
COPY . .
CMD ["flask", "run"]