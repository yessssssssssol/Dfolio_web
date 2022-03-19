import { Schema, model } from "mongoose";
import moment from "moment";

const ProjectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
