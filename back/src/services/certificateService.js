import { Certificate } from '../db';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

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
    const certificate = await Certificate.findById({ id });

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
  static async setCertificate({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        '올바른 자격증 id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.whenDate) {
      const fieldToUpdate = 'whenDate';
      const newValue = moment(toUpdate.whenDate).format('YYYY-MM-DD');
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async deleteCertificate({ id }) {
    const isDataDeleted = await Certificate.deleteById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        '해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export { certificateAuthService };
