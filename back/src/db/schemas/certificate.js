import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema(
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

const CertificateModel = model('Certificate', CertificateSchema);

export { CertificateModel };
