import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    toDate: {
      type: Date,
      required: false,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
