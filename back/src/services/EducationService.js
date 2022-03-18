import { Education } from '../db';
import { v4 as uuidv4 } from 'uuid';

class EducationAuthService {
  static async addEducation({ userId, title, description, whenDate }) {
    // id는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, userId, title, description, whenDate };

    //db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }
  static async getEducationInfo({ id }) {
    const Education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!Education) {
      const errorMessage =
        '올바른 자격증id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    return Education;
  }
  static async getEducations({ userId }) {
    const Educations = await Education.findAll({ userId });

    if (!Educations) {
      const errorMessage =
        '해당 작성자의 자격증 내역이 없습니다. 다시 한번 확인해 주세요.';
    }
    return Educations;
  }
  static async setEducation({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let Education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!Education) {
      const errorMessage =
        '올바른 자격증 id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      Education = await Education.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      Education = await Education.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.whenDate) {
      const fieldToUpdate = 'whenDate';
      const newValue = toUpdate.whenDate;
      Education = await Education.update({ id, fieldToUpdate, newValue });
    }

    return Education;
  }
}

export { EducationAuthService };
