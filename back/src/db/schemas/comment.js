import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
