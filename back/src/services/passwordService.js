import { User } from "../db";
const bcrypt = require("bcrypt");

class passwordService {
  static async getUser({ email }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return user;
  }
  static async setUser({ email, newPassword, passwordReset }) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.updatePassword({
      email,
      newPassword: hashedPassword,
      passwordReset,
    });

    return user;
  }
  /*
  // 이것도 loginRequired 를 사용하지 않아서? 사용 불가?? 
  static async correctPassword({ password, correctPasswordHash }) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return;
  }
  */
}

export { passwordService };
