import { User, Comment } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class commentAuthService {
  static async addComment({ hostId, content, authorId }) {
    // // 이메일 중복 확인
    const host = await User.findById({ userId: hostId });
    const author = await User.findById({ userId: authorId });
    const id = uuidv4();
    const newComment = {
      id,
      host,
      content,
      author,
    };
    // db에 저장
    const createdNewComment = await Comment.create({ newComment });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }
  static async getCommentInfo({ commentId, authorId }) {
    const comment = await Comment.findById({ commentId });
    const user = await User.findById({ authorId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!comment) {
      const errorMessage = "올바른 id를 입력해 주세요. 댓글 내역이 없습니다.";
      return { errorMessage };
    }

    const newComment = {
      id: comment.id,
      content: comment.content,
      author: user.name,
    };

    return newComment;
  }
  static async getComments({ hostId }) {
    const host = await User.findById({ userId: hostId });
    const comments = await Comment.findAll({ hostId: host._id });
    const newComments = [];
    if (!comments) {
      const errorMessage =
        "해당 작성자의 댓글 내역이 없습니다. 다시 한번 확인해 주세요.";
      return { errorMessage };
    }

    for (let i = 0; i < comments.length; i++) {
      let author = await User.findByObjectId({ objectId: comments[i].author });
      newComments.push({
        id: comments[i].id,
        content: comments[i].content,
        author: author.name,
      });
    }

    return newComments;
  }
  static async setComment({ commentId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let comment = await Comment.findById({ commentId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!comment) {
      const errorMessage = "올바른 id를 입력해 주세요. 댓글 내역이 없습니다.";
      return { errorMessage };
    }

    // 업데이트 대상에 host가 있다면, 즉 host 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      console.log(newValue);
      comment = await Comment.update({
        commentId,
        fieldToUpdate,
        newValue,
      });
    }

    return comment;
  }

  static async deleteComment({ commentId, userId }) {
    const user = await User.findById({ userId });
    const comment = await Comment.findById({ commentId });
    const author = comment.author;
    console.log(user);
    console.log(comment);

    if (!author.equals(user._id)) {
      const errorMessage = "자신의 댓글만 지울 수 있습니다.";
      return { errorMessage };
    }

    const isDataDeleted = await Comment.deleteById({ commentId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 댓글이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
  //   static async getUser({ email, password }) {
  //     // 이메일 db에 존재 여부 확인
  //     const user = await User.findByEmail({ email });
  //     if (!user) {
  //       const errorMessage =
  //         "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
  //       return { errorMessage };
  //     }

  //     // 비밀번호 일치 여부 확인
  //     const correctPasswordHash = user.password;
  //     const isPasswordCorrect = await bcrypt.compare(
  //       password,
  //       correctPasswordHash
  //     );
  //     if (!isPasswordCorrect) {
  //       const errorMessage =
  //         "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
  //       return { errorMessage };
  //     }

  //     // 로그인 성공 -> JWT 웹 토큰 생성
  //     const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  //     //jwt default는 24시간 -> 1시간으로 변경
  //     const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  //     // 반환할 loginuser 객체를 위한 변수 설정
  //     const id = user.id;
  //     const name = user.name;
  //     const description = user.description;

  //     const loginUser = {
  //       token,
  //       id,
  //       email,
  //       name,
  //       description,
  //       errorMessage: null,
  //     };

  //     return loginUser;
  //   }

  //   static async getUsers() {
  //     const users = await User.findAll();
  //     return users;
  //   }

  //   static async setUser({ userId, toUpdate }) {
  //     // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
  //     let user = await User.findById({ userId });
  //     const equalEmailUser = await User.findByEmail({ email: toUpdate.email });

  //     // db에서 찾지 못한 경우, 에러 메시지 반환
  //     if (!user) {
  //       const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
  //       return { errorMessage };
  //     }
  //     //원래 사용하던 email과 동일하지 않은 경우 && db에 동일한 이메일이 존재한 경우 , 에러 메시지 반환
  //     if (user.email !== toUpdate.email && equalEmailUser) {
  //       const errorMessage =
  //         "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
  //       return { errorMessage };
  //     }

  //     // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
  //     if (toUpdate.name) {
  //       const fieldToUpdate = "name";
  //       const newValue = toUpdate.name;
  //       user = await User.update({ userId, fieldToUpdate, newValue });
  //     }

  //     if (toUpdate.email) {
  //       const fieldToUpdate = "email";
  //       const newValue = toUpdate.email;
  //       user = await User.update({ userId, fieldToUpdate, newValue });
  //     }

  //     if (toUpdate.password) {
  //       const fieldToUpdate = "password";
  //       const newValue = toUpdate.password;
  //       user = await User.update({ userId, fieldToUpdate, newValue });
  //     }

  //     if (toUpdate.description) {
  //       const fieldToUpdate = "description";
  //       const newValue = toUpdate.description;
  //       user = await User.update({ userId, fieldToUpdate, newValue });
  //     }

  //     if (toUpdate.profilelink) {
  //       const fieldToUpdate = "profilelink";
  //       const newValue = toUpdate.profilelink;
  //     }

  //     if (toUpdate.image) {
  //       const fieldToUpdate = "image";
  //       const newValue = toUpdate.image;
  //       user = await User.update({ userId, fieldToUpdate, newValue });
  //     }

  //     return user;
  //   }

  //   static async getUserInfo({ userId }) {
  //     const user = await User.findById({ userId });

  //     // db에서 찾지 못한 경우, 에러 메시지 반환
  //     if (!user) {
  //       const errorMessage =
  //         "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
  //       return { errorMessage };
  //     }

  //     return user;
  //   }

  //   static async setLike({ currentUserId, otherUserId }) {
  //     // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
  //     const currentUser = await User.findById({ userId: currentUserId });
  //     const otherUser = await User.findById({ userId: otherUserId });

  //     const fieldToUpdate = "likeCount";

  //     const isLiked = await Like.findByUser({ currentUser, otherUser });
  //     let updatedLike = {};

  //     if (isLiked) {
  //       const newValue = otherUser.likeCount - 1;
  //       const user = await User.update({
  //         userId: otherUser.id,
  //         fieldToUpdate,
  //         newValue,
  //       });
  //       await Like.deleteById({ isLiked });
  //       updatedLike = { data: false };
  //     } else {
  //       const newValue = otherUser.likeCount + 1;
  //       const user = await User.update({
  //         userId: otherUser.id,
  //         fieldToUpdate,
  //         newValue,
  //       });
  //       await Like.create({ currentUser, otherUser });
  //       updatedLike = { data: true };
  //     }

  //     return updatedLike;
  //   }
  //   static async deleteUser({ userId }) {
  //     const isDataDeleted = await User.deleteById({ userId });

  //     // db에서 찾지 못한 경우, 에러 메시지 반환
  //     if (!isDataDeleted) {
  //       const errorMessage =
  //         "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
  //       return { errorMessage };
  //     }

  //     return { status: "ok" };
  //   }
}

export { commentAuthService };
