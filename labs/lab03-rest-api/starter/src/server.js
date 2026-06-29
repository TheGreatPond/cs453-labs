import express from "express";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
  let nextId = 3;
  const items = [
    { id: 1, name: "keyboard", quantity: 10 },
    { id: 2, name: "mouse", quantity: 5 }
  ];

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // DONE: Return all items.
  app.get("/items", (req, res) => {
    res.json(items);
  });

  // DONE: Return one item by ID.
  app.get("/items/:id", (req, res) => {

    let index = items.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      const single_item = items.find(test => test.id == req.params.id);
      res.json(JSON.stringify(single_item));
    } else {
      res.status(404).json({ error: "Resource requested not found to retrieve" });
    }

  });

  // DONE: Create a new item.
  app.post("/items", (req, res) => {
  // TODO: Validate input as name and quantity
    if (req.body.hasOwnProperty('quantity') && req.body.hasOwnProperty('name') && Object.keys(req.body).length === 2){
      let index = items.findIndex(test => test.id == nextId);
      items.push({"id":nextId, "name":req.body.name, "quantity":req.body.quantity});
      nextId++;
      res.status(201).json(JSON.stringify(items[index]));
    } else {
      res.status(400).json({ error: "Malformed json, please try again with only keys name and quantity" });
    }



  });

  // DONE: Update an existing item.
  app.put("/items/:id", (req, res) => {
    // TODO: Validate input as id, name and quantity
    let index = items.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      if (req.body.hasOwnProperty('quantity') && req.body.hasOwnProperty('name') && Object.keys(req.body).length === 2){
          items[index].id = req.params.id;
          items[index].name = req.body.name;
          items[index].quantity = req.body.quantity;
          res.json(JSON.stringify(items[index]));
        } else {
          res.status(400).json({ error: "Malformed json, please try again with only keys name and quantity" });
        }
      } else {
      res.status(404).json({ error: "Resource requested not found to update" });
    }
  });

  // DONE: Delete an existing item.
  app.delete("/items/:id", (req, res) => {
    let index = items.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      items.splice(index, 1);
      res.status(204).json({ status: "ok" });
    }
    else{
      console.log({ error: "Resource requested not found to delete" });
      res.status(404).json({ error: "Resource requested not found to delete" });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Lab 3 REST API listening on port ${PORT}`);
  });
}
