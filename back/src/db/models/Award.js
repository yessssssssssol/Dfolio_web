import { AwardModel } from '../schemas/award';

class Award {
  static async create({ awardData }) {
    const createdNewAward = await AwardModel.create(awardData);
    return createdNewAward;
  }

  static async update({ awardId, fieldToUpdate, value }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: value };
    const option = { returnOriginal: false };
    const updatedUser = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return updatedUser;
  }

  static async findById({ awardId }) {
    const award = await AwardModel.findOne({ id: awardId });
    return award;
  }

  static async findByUserId({ userId }) {
    const award = await AwardModel.find({ userId });
    return award;
  }
}

export { Award };
