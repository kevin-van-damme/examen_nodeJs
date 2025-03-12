import express from "express";
import {
  getHelloWorld,
  getTodos,
  addTodo,
  updateTodo,
} from "../controllers/exampleController";
import {
  getAllSnippets,
  insertNewSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router
  .get("/test", getHelloWorld)
  .get("/snippets", getAllSnippets)
  .get("/todos", getTodos)
  .post("/snippets", insertNewSnippet)
  .post("/todos", addTodo)
  .patch("/todos/:id", updateTodo);

export default router;
