import { Certificate } from '../db';

class certificateAuthService {
  static async addCertificate({ userId, title, description, whenDate }) {
    const newCertificate = { id: userId, title, description, whenDate };
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }
  static async getcertificateInfo({ userId }) {
    const certificate = await Certificate.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        '해당 작성자 자격증 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return certificate;
  }
}

export { certificateAuthService };
