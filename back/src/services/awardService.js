import { Award } from '../db/models/Award';
import { v4 as uuidv4 } from 'uuid';

class AwardService {
  // Create Award
  static async createAward({ userId, title, description }) {
    const awardId = uuidv4();

    const awardData = { id: awardId, userId, title, description };
    const newAward = await Award.create({ awardData });
    return newAward;
  }

  // Update Award
  static async updateAward({ awardId, updateValue }) {
    let award = await Award.findById({ awardId });
    // Exception
    if (!award) {
      const errorMessage = '일치하는 awardId가 없습니다.';
      return { errorMessage };
    }

    if (updateValue.title) {
      const fieldToUpdate = 'title';
      const value = updateValue.title;
      award = await Award.update({ awardId, fieldToUpdate, value });
    }
    if (updateValue.description) {
      const fieldToUpdate = 'description';
      const value = updateValue.description;
      award = await Award.update({ award_id, fieldToUpdate, value });
    }
    return award;
  }

  // Get Award
  static async getAwardById({ awardId }) {
    const award = await Award.findById({ award_id });

    if (!award) {
      const errorMessage = '일치하는 awardId가 없습니다.';
      return { errorMessage };
    }
    return award;
  }

  // Get Award list
  static async getAwardListByUserId({ userId }) {
    const awardList = await Award.findByUserId({ userId });
    return awardList;
  }
}

export { AwardService };
