import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();
certificateAuthRouter.use(loginRequired);

certificateAuthRouter.post("/certificate/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    //req 에서 데이터 가져오기
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const whenDate = req.body.whenDate;

    //데이터 자격증 db에 추가하기
    const newCertificate = await certificateAuthService.addCertificate({
      userId,
      title,
      description,
      whenDate,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }
    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateAuthRouter.get("/certificates/:id", async (req, res, next) => {
  try {
    const certificateId = req.params.id;
    const currentCertificateInfo =
      await certificateAuthService.getcertificateInfo({ certificateId });

    if (currentCertificateInfo.errorMessage) {
      throw new Error(currentCertificateInfo.errorMessage);
    }

    res.status(200).send(currentCertificateInfo);
  } catch (error) {
    next(error);
  }
});
certificateAuthRouter.get(
  "/certificatelist/:userId",
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      // 사용자의 전체 자격증 목록을 가져옴
      const certificates = await certificateAuthService.getCertificates({
        userId,
      });

      if (certificates.errorMessage) {
        throw new Error(certificates.errorMessage);
      }
      res.status(200).send(certificates);
    } catch (error) {
      next(error);
    }
  }
);
certificateAuthRouter.put("/certificates/:id", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    // URI로부터 자격증 id를 추출함.
    const certificateId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const whenDate = req.body.whenDate ?? null;

    const toUpdate = { title, description, whenDate };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedCertificate = await certificateAuthService.setCertificate({
      userId,
      certificateId,
      toUpdate,
    });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
});

certificateAuthRouter.delete("/certificates/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const certificateId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await certificateAuthService.deleteCertificate({
      certificateId,
    });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { certificateAuthRouter };
