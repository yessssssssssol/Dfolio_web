import { Award } from '../db/models/Award';
import { v4 as uuidv4 } from 'uuid';

class AwardService {
  static async createAward({ userId, title, description }) {
    const awardId = uuidv4();

    const awardData = { id: awardId, userId, title, descripttion };
    const newAward = await Award.create({ awardData });
    return newAwawrd;
  }
}

export { AwardService };
