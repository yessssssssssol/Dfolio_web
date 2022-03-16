import { Certificate } from '../db';

class certificateAuthService {
  static async addCertificate({
    currentUserId,
    userId,
    title,
    description,
    whenDate,
  }) {
    if (currentUserId !== userId) {
      const errorMessage = '다른 사람의 포트폴리오는 편집할 수 없습니다.';
      console.log(currentUserId);
      console.log(userId);
      return { errorMessage };
    }

    const newCertificate = { id: userId, title, description, whenDate };
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }
}

export { certificateAuthService };
