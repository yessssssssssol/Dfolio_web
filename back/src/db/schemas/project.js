import { Schema, model } from 'mongoose';

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
      default: new Date(),
    },
    toDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };
