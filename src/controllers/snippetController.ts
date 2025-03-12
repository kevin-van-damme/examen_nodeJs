import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { Snippet } from "../models/snippetModel";

export const getAllSnippets = async (req: Request, res: Response) => {
  try {
    const { page, language, tags } = req.query;
    const langFilter = language
      ? { language: { $regex: language, $options: "i" } }
      : {};

    const tagsFilter = tags ? { tags: [{ $regex: tags, $options: "i" }] } : {};
    const filtSnippets = await Snippet.find(langFilter);
    const tagsSnippets = await Snippet.find(tagsFilter);
    const countSnippets = await Snippet.find().countDocuments();
    const snippets = await Snippet.find()
      .lean()
      .limit(10)
      .skip(page ? 10 * (+page - 1) : 0)
      .sort({ createdAt: -1 });
    const pages = Math.ceil(countSnippets / 10);
    if (page && +page > pages) {
      res.status(404).json({ message: "Page not found" });
      return;
    }
    const decodedArr = snippets.map((snip) => {
      return {
        ...snip,
        code: Buffer.from(snip.code, "base64").toString("utf-8"),
      };
    });
    if (!decodedArr) {
      res.status(500).json({ message: "There are no snippets" });
    } else {
      res.status(200).json({
        filtSnippets,
        tagsSnippets,
        decodedArr,
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};

export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      res.status(500).json({ message: "There is no snippet with this id!" });
    } else {
      res.status(200).json(snippet);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};

export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteSnip = await Snippet.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      message: `Snippet with id ${id} has been succesfully deleted!`,
    });
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
    if (req.body.expiresIn) {
      req.body.expiresIn = req.body.expiresIn / 60;
    }
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

export const updateSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (req.body.expiresIn) {
      req.body.expiresIn = req.body.expiresIn / 60;
    }
    const snippet = await Snippet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!snippet) {
      res.status(500).json({ message: "There is no snippet with this id!" });
    } else {
      res.status(200).json({ message: `Snippet succesfully updated` });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};
