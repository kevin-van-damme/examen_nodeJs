import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    trim: true,
  },
  updatedAt: {
    type: String,
    required: true,
    trim: true,
  },
  expiresIn: {
    type: Number,
    required: false,
  },
});

export const Snippet = mongoose.model("Snippet", snippetSchema);
