// const sendMail = require("../utils/send-mail");
// const generateRandomPassword = require('../utils/generate-random-password')
// const hashPassword = require("../utils/hash-password");
import { Router } from "express";
import { passwordService } from "../services/passwordService";
import { loginRequired } from "../middlewares/loginRequired";
import { userAuthService } from "../services/userService";
import generateRandomPassword from "../utils/generateRandomPassword";
import hashPassword from "../utils/hashPassword";
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
    const password = generateRandomPassword();

    const updatedUser = await passwordService.setUser({
      email,
      // hashPassword 로 업데이트 하기
      newPassword: hashPassword(password),
      passwordReset: true,
    });

    // 패스워드 발송하기
    const result = await sendMail(
      email,
      "비밀번호가 변경되었습니다.",
      `변경된 비밀번호는: ${password} 입니다`
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

      if (user.password !== hashPassword(currentPassword)) {
        throw new Error("임시 비밀번호가 일치하지 않습니다.");
      }

      const updatedUser = await passwordService.setUser({
        email: user.email,
        // hashPassword 로 업데이트 하기
        password: hashPassword(password),
        passwordReset: false,
      });

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

export { passwordRouter };
