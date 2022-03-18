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
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedCertificate;
  }
}

export { Certificate };
