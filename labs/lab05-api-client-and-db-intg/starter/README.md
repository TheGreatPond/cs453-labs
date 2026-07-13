# Lab 5 Starter

## How to Run

```bash
npm install
docker compose up -d
npm run api
npm run client
```

Open:

```text
http://localhost:5173
```

Postgres is exposed on:

```text
postgres://postgres:postgres@localhost:5433/lab05
```

## What Already Works

- Postgres runs in Docker.
- The Express server connects to Postgres.
- The server creates and seeds an `items` table on startup.
- `GET /health`, `GET /api/items`, and `POST /api/items` are implemented.
- The browser client can load items and add a new item.

## What You Need to Add

- `GET /api/items/:id`
- `PUT /api/items/:id`
- `PATCH /api/items/:id`
- `DELETE /api/items/:id`
- Better validation and error handling
- Client-side UI for at least some of the new routes

## Graduate Extension

Add one more resource or relationship, such as categories, projects, or tags,
and connect it to the database.

## Reflection Answers

### 1. What changed when the API moved from in-memory data to Postgres?

The data gained persistence meaning it would remain even if the api server was stopped and restarted

### 2. When should you use `PUT` instead of `PATCH`?

When only updating a portion of a record

### 3. What kinds of validation belong in the API even if the browser client also validates input?

Input validation still belongs in the API since the webpage could be modified to allow unexpected inputs to be sent to the api

### 4. How does the browser client help you test the API differently than `curl` alone?

The browser client also might implement security policies such as cors that are not enabled for curl

### 5. If you added an extension, what did you add and why?

My extension adds a restock quantity that can be viewed as the amount of that item that would arrive in a standard restocking palette. In a store, this restocking call could be used whenever a palette arrives to restock an item within the inventory spreadsheet. Different items will have different sized restock quantities since different items would have different quantities of items on a palette. The starting DB will need to have the restock_quantities column added in order to cooperate with the new code. I've also made a swagger doc for this that should be useful in testing outside of the client webpage.
