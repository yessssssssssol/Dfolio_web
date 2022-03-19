import { Schema, model } from "mongoose";
import moment from "moment";

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
      default: moment().format("YYYY-MM-DD"),
    },
  },
  { timestamps: true }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
