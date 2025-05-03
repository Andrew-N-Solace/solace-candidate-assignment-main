# ---------------- configuration ----------------
DB_SERVICE ?= db               # ← from docker-compose.yml
DB_USER    ?= postgres
DB_PASS    ?= password
DB_NAME    ?= solaceassignment  # matches POSTGRES_DB in compose

# psql helper (connects to the postgres maintenance DB)
psql = docker compose exec -T $(DB_SERVICE) \
        psql -U $(DB_USER) -v ON_ERROR_STOP=1 -d postgres -c

# ---------------- targets ----------------------
.PHONY: up down db-create db-migrate db-seed db-setup dev

# Boot postgres container
up:
	docker compose up -d $(DB_SERVICE)

# Stop & remove containers
down:
	docker compose down

# Create $(DB_NAME) if it doesn't already exist
db-create: up
	@DB_NAME_CLEAN=$$(echo "$(DB_NAME)" | xargs); \
	echo "Ensuring database '$$DB_NAME_CLEAN' exists…"; docker compose exec -T $(DB_SERVICE) \
	psql -U $(DB_USER) -tAc "SELECT 1 FROM pg_database WHERE datname='$$DB_NAME_CLEAN'" | grep -q 1 || { docker compose exec -T $(DB_SERVICE) psql -U $(DB_USER) -v ON_ERROR_STOP=0 -d postgres -c "CREATE DATABASE \"$$DB_NAME_CLEAN\";"; };
	echo "Database ready."

# regenerate TS types from DB
gen: 
	npx drizzle-kit generate:pg

# Run Drizzle migrations
db-migrate:
	npx drizzle-kit push

# Seed the data
db-seed: 
	curl -s -X POST http://localhost:3000/api/seed && echo "Seed complete."

# Full DB setup
db-setup: db-create db-migrate db-seed
	@echo "Postgres fully initialised."

# Reset the DB
db-reset:
	docker compose exec -T db psql -U postgres -d solaceassignment \
	  -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'
	npx drizzle-kit push

# Start Next.js dev server
dev:
	npm run dev
