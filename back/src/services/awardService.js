import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardAuthService {
  // award 생성
  static async addAward({ userId, title, description }) {
    const awardId = uuidv4();
    const newAward = { id: awardId, userId, title, description };
    const createdNewAward = await Award.create({ newAward });
    return createdNewAward;
  }
  // award 수정
  static async setAward({ awardId, updateValue }) {
    let award = await Award.findById({ awardId });
    // db에 없는 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage = "일치하는 awardId가 없습니다.";
      return { errorMessage };
    }

    if (updateValue.title) {
      const fieldToUpdate = "title";
      const newValue = updateValue.title;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }
    if (updateValue.description) {
      const fieldToUpdate = "description";
      const newValue = updateValue.description;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }
    return award;
  }

  // award 가져오기
  static async getAwardById({ awardId }) {
    const award = await Award.findById({ awardId });

    // db에 없는 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage = "일치하는 awardId가 없습니다.";
      return { errorMessage };
    }
    return award;
  }

  // user의 모든 award 가져오기
  static async getAwardListByUserId({ userId }) {
    const awardList = await Award.findAll({ userId });
    return awardList;
  }

  // award 삭제
  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteById({ awardId });

    // db에 없는 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok" };
  }
}

export { awardAuthService };
