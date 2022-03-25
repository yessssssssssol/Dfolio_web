import { User, Like } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = {
      id,
      name,
      email,
      password: hashedPassword,
    };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    //jwt default는 24시간 -> 1시간으로 변경
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;
    const passwordReset = user.passwordReset;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      passwordReset,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers(sortBy) {
    const users = await User.findAll(sortBy);
    return users;
  }

  static async setUser({ userId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ userId });
    const equalEmailUser = await User.findByEmail({ email: toUpdate.email });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    //원래 사용하던 email과 동일하지 않은 경우 && db에 동일한 이메일이 존재한 경우 , 에러 메시지 반환
    if (user.email !== toUpdate.email && equalEmailUser) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = toUpdate.password;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.profilelink) {
      const fieldToUpdate = "profilelink";
      const newValue = toUpdate.profilelink;
    }

    if (toUpdate.image) {
      const fieldToUpdate = "image";
      const newValue = toUpdate.image;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    return user;
  }

  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static async setLike({ currentUserId, otherUserId }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    const currentUser = await User.findById({ userId: currentUserId });
    const otherUser = await User.findById({ userId: otherUserId });

    const fieldToUpdate = "likeCount";

    const isLiked = await Like.findByUser({ currentUser, otherUser });

    let updatedUser = {};

    if (isLiked) {
      const newValue = otherUser.likeCount - 1;
      updatedUser = await User.update({
        userId: otherUser.id,
        fieldToUpdate,
        newValue,
      });

      await Like.deleteById({ isLiked });

      //updatedLike = { data: false, likeCount: newValue };
    } else {
      const newValue = otherUser.likeCount + 1;
      updatedUser = await User.update({
        userId: otherUser.id,
        fieldToUpdate,
        newValue,
      });
      await Like.create({ currentUser, otherUser });

      //updatedLike = { data: true, likeCount: newValue };
    }

    return updatedUser;
  }
}

export { userAuthService };
