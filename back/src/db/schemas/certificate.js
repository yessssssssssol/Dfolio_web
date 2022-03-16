import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
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
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const CertificateModel = model('Certificate', CertificateSchema);

export { CertificateModel };
