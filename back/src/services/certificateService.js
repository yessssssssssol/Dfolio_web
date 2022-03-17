import { Certificate } from '../db';
import { v4 as uuidv4 } from 'uuid';

class certificateAuthService {
  static async addCertificate({ userId, title, description, whenDate }) {
    // id는 유니크 값 부여
    const id = uuidv4();
    const newCertificate = { id, userId, title, description, whenDate };

    //db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }
  static async getcertificateInfo({ id }) {
    const certificate = await Certificate.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        '올바른 자격증id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    return certificate;
  }
  static async getCertificates({ userId }) {
    const certificates = await Certificate.findAll({ userId });

    if (!certificates) {
      const errorMessage =
        '해당 작성자의 자격증 내역이 없습니다. 다시 한번 확인해 주세요.';
    }
    return certificates;
  }
}

export { certificateAuthService };
