import { Certificate } from '../db';

class certificateAuthService {
  static async addCertificate({
    currentUserId,
    id,
    name,
    description,
    whenDate,
  }) {
    if (currentUserId !== id) {
      const errorMessage = '다른 사람의 포트폴리오는 편집할 수 없습니다.';
      return { errorMessage };
    }

    const newCertificate = { id, name, description, whenDate };
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }
}

export { certificateAuthService };
