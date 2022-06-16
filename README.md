# News API

## Tech Stack
- Express
- Postgresql 12.*
- Sequelize ORM
- Redis

## Prerequisites
- Docker
- Docker Compose

## Installation (Docker)
1. Clone this repository
2. Copy `.env.example` to `.env`
3. Configure env variables
   - Leave `APP_PORT` in 3300, changes has to be done also in `docker-compose.yaml`
   - Leave `APP_URL` as it is
   - Fill `DATABASE_HOST` with `db`
   - Fill `REDIS_HOST` with `cache`
4. Run `docker compose up -d`
5. Access api container to migrate and seed database
  ```
  docker exec -it news-api /bin/sh
  ```
  ```
  npm run db:migrate
  ```
  ```
  npm run db:seed
  ```
6. This repository is bind mounted with the container, but if there is any change with the local code, please restart the container
7. Access the route list in container log
8. The bind local url is in `http://localhost:3301`
9. Run `docker logs news-api` to access the log and see the route list

## Postman API Docs
- https://documenter.getpostman.com/view/14542872/UzBiR9yJ
