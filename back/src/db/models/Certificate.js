import { CertificateModel } from '../schemas/certificate';

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  static async findById({ userId }) {
    const certificate = await CertificateModel.findOne({ id: userId });
    return certificate;
  }
}

export { Certificate };
