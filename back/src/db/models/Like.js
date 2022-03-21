import { LikeModel } from "../schemas/like";

class Like {
  static async create({ currentUser, otherUser }) {
    const createdNewLike = await LikeModel.create({
      currentUser,
      otherUser,
    });
    return createdNewLike;
  }
  static async findByUser({ currentUser, otherUser }) {
    const like = await LikeModel.findOne({
      $and: [{ currentUser }, { otherUser }],
    });
    return like;
  }
  static async deleteById({ isLiked }) {
    const deleteResult = await LikeModel.deleteOne({
      isLiked,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Like };
