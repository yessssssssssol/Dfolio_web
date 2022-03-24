import { Router } from "express";
import { passwordService } from "../services/passwordService";
import { loginRequired } from "../middlewares/loginRequired";
import { userAuthService } from "../services/userService";
import generateRandomPassword from "../utils/generateRandomPassword";
import sendMail from "../utils/sendMail";

const passwordRouter = Router();

passwordRouter.post("/reset-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await passwordService.getUser({ email });
    console.log(user);
    if (!user) {
      throw new Error("해당 메일로 가입된 사용자가 없습니다.");
    }

    // 랜덤 패스워드 생성하기
    const newPassword = generateRandomPassword();

    const updatedUser = await passwordService.setUser({
      email,
      newPassword,
      passwordReset: true,
    });

    // 패스워드 발송하기
    await sendMail(
      email,
      "비밀번호가 변경되었습니다.",
      `변경된 비밀번호는: ${newPassword} 입니다`
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
});

passwordRouter.post(
  "/change-password",
  loginRequired,
  async (req, res, next) => {
    try {
      const { currentPassword, password } = req.body;
      // 유저 정보 가져오기
      const userId = req.currentUserId;
      const user = await userAuthService.getUserInfo({ userId });

      await passwordService.correctPassword(currentPassword, user.password);

      const updatedUser = await passwordService.setUser({
        email: user.email,
        password: password,
        passwordReset: false,
      });

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

export { passwordRouter };
