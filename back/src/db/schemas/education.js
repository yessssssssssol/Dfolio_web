import { Schema, model } from "mongoose";
import moment from "moment";

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
      default: moment().format("YYYY-MM-DD"),
    },
    toDate: {
      type: Date,
      required: false,
      default: moment().format("YYYY-MM-DD"),
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
