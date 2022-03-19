import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class educationAuthService {
  static async addEducation({ userId, school, major, position, fromDate, toDate }) {
    // id는 유니크 값 부여
    const educationId = uuidv4();
    fromDate = moment(fromDate).format("YYYY-MM-DD");
    toDate = moment(toDate).format("YYYY-MM-DD");
    const newEducation = {
      id: educationId, 
      userId, 
      school, 
      major, 
      position,
      fromDate,
      toDate,
    };
    
    //db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }
  static async getEducationInfo({ educationId }) {
    const education = await Education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "올바른 학력 id를 입력해 주세요. 학력 내역이 없습니다.";
      return { errorMessage };
    }

    return education;
  }
  static async getEducations({ userId }) {
    const educations = await Education.findAll({ userId });

    if (!educations) {
      const errorMessage =
        "해당 작성자의 학력 내역이 없습니다. 다시 한번 확인해 주세요.";
    }
    return educations;
  }
  static async setEducation({ educationId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let education = await Education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "올바른 학력 id를 입력해 주세요. 학력 내역이 없습니다.";
      return { errorMessage };
    }

    // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }
    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }
    if (toUpdate.fromDate) {
      const fieldToUpdate = "fromDate";

      const newValue = moment(toUpdate.fromDate).format("YYYY-MM-DD");
      console.log(newValue);
      education = await Education.update({ 
        educationId,
        fieldToUpdate,
        newValue, 
      });
    }
    if (toUpdate.toDate) {
      const fieldToUpdate = "toDate";
      const newValue = moment(toUpdate.toDate).format("YYYY-MM-DD");
      education = await Education.update({ 
        educationId,
        fieldToUpdate,
        newValue
      });
    }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { educationAuthService };
