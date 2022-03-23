import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();
awardAuthRouter.use(loginRequired);

// Create Award
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

// Update Award
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

// Find Award By Award ID
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

// Find Award By User ID
awardAuthRouter.get("/awardlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const awardList = await awardAuthService.getAwardListByUserId({ userId });
    res.status(200).json(awardList);
  } catch (err) {
    next(err);
  }
});

// Delete Award
awardAuthRouter.delete("/awards/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const id = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await awardAuthService.deleteAward({ id });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { awardAuthRouter };
