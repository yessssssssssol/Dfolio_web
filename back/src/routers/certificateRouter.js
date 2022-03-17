import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { certificateAuthService } from '../services/certificateService';

const certificateAuthRouter = Router();

certificateAuthRouter.post(
  '/certificate/create',
  loginRequired,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
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
  },
);

certificateAuthRouter.get(
  '/certificates/:id',
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const currentCertificateInfo =
        await certificateAuthService.getcertificateInfo({ userId });

      if (currentCertificateInfo.errorMessage) {
        throw new Error(currentCertificateInfo.errorMessage);
      }

      res.status(200).send(currentCertificateInfo);
    } catch (error) {
      next(error);
    }
  },
);

export { certificateAuthRouter };
