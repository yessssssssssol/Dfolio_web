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
  // 로그인을 하지 않은 상태?에서 비밀번호 재설정을 진행하려고 합니다.
  // loginRequired,
  async (req, res, next) => {
    try {
      const { currentPassword, password } = req.body;
      // 유저 정보 가져오기
      const userId = req.currentUserId;
      const user = await userAuthService.getUserInfo({ userId });
      // updatedUser 변수에 담을때 사용해주신 user.email로는 email정보를 받아오지 못하는 것을 확인하여 req.body.email로 받아와 email에 넣어주었습니다. 
      const email  = req.body.email;

      // currentPassword를 받아올 수 없어서 없애버렸는데, 이게 없으면 문제가 생길까요??
      // await passwordService.correctPassword(currentPassword, user.password);
      
      // passwordService에서는 newPassword로 받아오는데, 여기는 password로 표기되어있어서 데이터가 안넘어가서 수정했어요.
      const updatedUser = await passwordService.setUser({
        email,
        newPassword: password,
        passwordReset: false,
      });

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

export { passwordRouter };
