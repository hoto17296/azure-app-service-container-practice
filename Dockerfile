FROM node:20 AS frontend

WORKDIR /app

COPY frontend .

RUN npm ci && npm run build

FROM python:3.11

WORKDIR /app

COPY . .

RUN pip install -r backend/requirements.txt

COPY --from=frontend /app/dist /app/public
ENV STATIC_FILES_DIR /app/public

CMD ["python", "backend/main.py"]