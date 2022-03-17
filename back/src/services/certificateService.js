import { Certificate } from '../db';

class certificateAuthService {
  static async addCertificate({
    currentUserId,
    userId,
    title,
    description,
    whenDate,
  }) {
    const newCertificate = { id: userId, title, description, whenDate };
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }
}

export { certificateAuthService };
