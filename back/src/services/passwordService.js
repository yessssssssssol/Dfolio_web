import { User } from "../db";

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
    const user = await User.updatePassword({
      email,
      newPassword,
      passwordReset,
    });

    return user;
  }
}

export { passwordService };
