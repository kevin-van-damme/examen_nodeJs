import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Snippet } from "../models/snippetModel";

export const getAllSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json(snippets);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};
