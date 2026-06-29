import { describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

describe("Lab 3 starter", () => {
  test("GET /health returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/health")
        .expect(200);

    expect(response.body).toEqual({ status: "ok" });
  });

  test("GET /items returns all items", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/items")
        .expect(200);

    expect(response.body).toEqual([
      {
        "id": 1,
        "name": "keyboard",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "mouse",
        "quantity": 5
      }
    ]);
  });

  test("POST /items returns item created", async () => {
    const app = createApp();

    const response = await request(app)
      .post('/items')
      .send({ name: "monitor", quantity: 12 }); // Automatically stringifies

    expect(response.status).toBe(201);
    expect(response.body).toEqual("{\"id\":3,\"name\":\"monitor\",\"quantity\":12}"); // Compares objects directly
  });

  test("PUT /items/:id returns item updated", async () => {
    const app = createApp();

    const response = await request(app)
      .put('/items/1')
      .send({ name: "monitor", quantity: 12 }); // Automatically stringifies

    expect(response.status).toBe(200);
    expect(response.body).toEqual("{\"id\":\"1\",\"name\":\"monitor\",\"quantity\":12}"); // Compares objects directly
  });


  test("GET /item/:id returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/items/1")
        .expect(200);

    expect(response.body).toEqual("{\"id\":1,\"name\":\"keyboard\",\"quantity\":10}");
  });

  test("DELETE /item/:id returns code 204", async () => {
    const app = createApp();

    const response = await request(app)
        .delete('/items/1')
        .expect(204);

    expect(response.body).toEqual({});
  });

});