import { AwardModel } from '../schemas/award';

class Award {
  static async create({ awardData }) {
    const createdNewAward = await AwardModel.create(awardData);
    return createdNewAward;
  }
}

export { Award };
