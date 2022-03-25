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
      $and: [{ currentUser: currentUser }, { otherUser: otherUser }],
    });
    console.log(like);
    return like;
  }
  static async deleteById({ isLiked }) {
    const deleteResult = await LikeModel.deleteOne({
      _id: isLiked._id,
    });
    console.log(isLiked._id);
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Like };
