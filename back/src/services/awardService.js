import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardAuthService {
  static async addAward({ userId, title, description }) {
    const awardId = uuidv4();
    const newAward = { id: awardId, userId, title, description };
    const createdNewAward = await Award.create({ newAward });
    return createdNewAward;
  }
  static async setAward({ awardId, updateValue }) {
    let award = await Award.findById({ awardId });
    // Exception
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

  // Get Award
  static async getAwardById({ awardId }) {
    const award = await Award.findById({ awardId });

    if (!award) {
      const errorMessage = "일치하는 awardId가 없습니다.";
      return { errorMessage };
    }
    return award;
  }

  // Get Award list
  static async getAwardListByUserId({ userId }) {
    const awardList = await Award.findAll({ userId });
    return awardList;
  }
}

export { awardAuthService };
