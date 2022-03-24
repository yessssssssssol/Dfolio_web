import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ newComment }) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }
  static async findById({ commentId }) {
    const comment = await CommentModel.findOne({ id: commentId });
    return comment;
  }
  static async findAll({ hostId }) {
    const comments = await CommentModel.find({ userId: hostId });
    return comments;
  }
  static async update({ commentId, fieldToUpdate, newValue }) {
    const filter = { id: commentId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }
  static async deleteById({ commentId }) {
    const deleteResult = await CommentModel.deleteOne({ id: commentId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
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
