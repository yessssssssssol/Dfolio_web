import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();
awardAuthRouter.use(loginRequired);

// award 생성
awardAuthRouter.post("/award/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("Content-Type을 application/json으로 설정해주세요.");
    }
    const { userId, title, description } = req.body;
    const newAward = await awardAuthService.addAward({
      userId,
      title,
      description,
    });
    res.status(201).json(newAward);
  } catch (err) {
    next(err);
  }
});

// award 수정
awardAuthRouter.put("/awards/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const updateValue = { title, description };
    const updatedAward = await awardAuthService.setAward({
      awardId,
      updateValue,
    });

    // Error
    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }
    res.status(200).json(updatedAward);
  } catch (err) {
    next(err);
  }
});

// award 가져오기
awardAuthRouter.get("/awards/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id;
    const award = await awardAuthService.getAwardById({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    res.status(200).json(award);
  } catch (err) {
    next(err);
  }
});

// user의 모든 award 가져오기
awardAuthRouter.get("/awardlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const awardList = await awardAuthService.getAwardListByUserId({ userId });
    res.status(200).json(awardList);
  } catch (err) {
    next(err);
  }
});

// award 삭제
awardAuthRouter.delete("/awards/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id;
    console.log(awardId);
    const result = await awardAuthService.deleteAward({ awardId });
    console.log(result);
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { awardAuthRouter };
