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

export const insertNewSnippet = async (req: Request, res: Response) => {
  try {
    const encodedCode = Buffer.from(req.body.code).toString("base64");
    const snippet = (
      await Snippet.create({ ...req.body, code: encodedCode })
    ).toObject();
    const decodedCode = Buffer.from(snippet.code, "base64").toString("utf-8");
    res
      .status(201)
      .json({ status: "Success", data: { ...snippet, code: decodedCode } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};

// Encode
// const encodedCode = Buffer.from(HIER-DE-SNIPPET).toString("base64");
// Decode
// const decodedCode = Buffer.from(HIER-DE-SNIPPET, "base64").toString("utf-8");

// de snippet fetchen...

var date_time = new Date();
console.log(date_time);
