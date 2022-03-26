import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  static async findById({ awardId }) {
    const award = await AwardModel.findOne({ id: awardId });
    return award;
  }
  static async findAll({ userId }) {
    const award = await AwardModel.find({ userId });
    return award;
  }
  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
  static async deleteById({ awardId }) {
    const deleteResult = await AwardModel.deleteOne({ id: awardId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Award };
