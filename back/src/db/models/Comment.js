import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ newComment }) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }
  //   static async findByUser({ currentUser, otherUser }) {
  //     const like = await LikeModel.findOne({
  //       $and: [{ currentUser }, { otherUser }],
  //     });
  //     return like;
  //   }
  //   static async deleteById({ isLiked }) {
  //     const deleteResult = await LikeModel.deleteOne({
  //       isLiked,
  //     });
  //     const isDataDeleted = deleteResult.deletedCount === 1;
  //     return isDataDeleted;
  //   }
}

export { Comment };
