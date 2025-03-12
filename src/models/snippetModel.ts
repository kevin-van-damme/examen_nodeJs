import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
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
    expiresIn: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Snippet = mongoose.model("Snippet", snippetSchema);
