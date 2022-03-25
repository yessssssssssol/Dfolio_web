import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
