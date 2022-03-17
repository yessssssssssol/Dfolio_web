import { CertificateModel } from '../schemas/certificate';

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  static async findById({ id }) {
    const certificate = await CertificateModel.findOne({ id });
    return certificate;
  }
  static async findAll({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }
}

export { Certificate };
