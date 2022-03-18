import { Schema, model } from 'mongoose';

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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    whenDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

const EducationModel = model('Education', EducationSchema);

export { EducationModel };
