import express from "express";
import {
  getHelloWorld,
  getTodos,
  addTodo,
  updateTodo,
} from "../controllers/exampleController";
import {
  deleteSnippet,
  getAllSnippets,
  getSnippetById,
  insertNewSnippet,
  updateSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router
  .get("/test", getHelloWorld)
  .get("/snippets", getAllSnippets)
  .get("/snippets/:id", getSnippetById)
  .get("/todos", getTodos)
  .post("/snippets", insertNewSnippet)
  .post("/todos", addTodo)
  .delete("/snippets/:id", deleteSnippet)
  .patch("/snippets/:id", updateSnippet)
  .patch("/todos/:id", updateTodo);

export default router;
