# Lab 3 REST API

## How to Run

```bash
npm install
npm run server
```

The server runs on:

```text
http://localhost:3000
```

## How to Test

```bash
npm test
```

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/items` | Return all items |
| GET | `/items/:id` | Return one item |
| POST | `/items` | Create one item |
| PUT | `/items/:id` | Update one item |
| DELETE | `/items/:id` | Delete one item |

## Reflection Answers

### 1. What makes this API more REST-like than the previous HTTP/JSON lab?

TODO

### 2. What is the purpose of a route parameter such as `/items/:id`?

The route parameter informs the request of the location of the resource it is accessing

### 3. Why should `POST`, `PUT`, and `DELETE` use different HTTP methods?

They need 3 different methods since they are trying to accomplish 3 different things. Post creates new resources and is not idempotent, put replaces a resource rather than deleting it, and delete does what the name suggest and deletes whatver resource is specified 

### 4. What is the difference between a `400` error and a `404` error?

400 is client error or "request body is invalid" and 404 is that a requested item is not found

### 5. How does the OpenAPI file relate to your Express server code?

The OpenAPI doc guides the client application on what request and parameters are allowed when making request to the REST API Server

## Graduate Extension

The graduate extension for this project was to add automated tests for invalid input. To accomplish this, for each request that contains a request body, i am checking both the name of the arguments and count of arguments. This means that users should only be able to have the proper arguments and no unneccessary arguments in their json. If the json is malformed, a seperate error is returned from that of a request for a resource that could not be found.
