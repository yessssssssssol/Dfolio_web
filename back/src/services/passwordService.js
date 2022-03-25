import { User } from "../db";
const bcrypt = require("bcrypt");

class passwordService {
  // email을 통해 유저 정보 가져오기
  static async getUser({ email }) {
    const user = await User.findByEmail({ email });
    // db에 없는 경우, 에러
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return user;
  }
  // 비밀번호 변경
  static async setUser({ email, newPassword, passwordReset }) {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.updatePassword({
      email,
      newPassword: hashedPassword,
      passwordReset,
    });

    return user;
  }
}

export { passwordService };
