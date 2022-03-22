import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    otherUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
