import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });
      
    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  }
  catch (error) {
    next(error);
  }
});

userAuthRouter.get("/userlist/:sortBy", loginRequired, async (req, res, next) => {
  try {
    const sortBy = req.params.sortBy;
    console.log(sortBy)
    // 전체 사용자 목록을 얻음
    const users = await userAuthService.getUsers(sortBy);
    
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/user/current", loginRequired, async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put("/users/:id", loginRequired, async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const description = req.body.description ?? null;
    const profilelink = req.body.profilelink ?? null;

    // const toUpdate = { name, email, password, description, profilelink };
    const image = req.body.image ?? null;
    //const likeCount = req.body.likeCount ?? null;

    const toUpdate = { name, email, password, description, image, profilelink };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/users/:id", loginRequired, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ userId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", loginRequired, (req, res, next) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

userAuthRouter.put("/like/:id", loginRequired, async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const currentUserId = req.params.id;
    const otherUserId = req.body.otherUserId;
    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedLike = await userAuthService.setLike({
      currentUserId,
      otherUserId,
    });

    if (updatedLike.errorMessage) {
      throw new Error(updatedLike.errorMessage);
    }

    res.status(200).json(updatedLike);
  } catch (error) {
    next(error);
  }
});

export { userAuthRouter };
