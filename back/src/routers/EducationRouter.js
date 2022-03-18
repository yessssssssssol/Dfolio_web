import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { EducationAuthService } from '../services/EducationService';

const EducationAuthRouter = Router();

EducationAuthRouter.post(
  '/Education/create',
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
      const newEducation = await EducationAuthService.addEducation({
        userId,
        title,
        description,
        whenDate,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  },
);

EducationAuthRouter.get(
  '/Educations/:id',
  loginRequired,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const currentEducationInfo =
        await EducationAuthService.getEducationInfo({ id });

      if (currentEducationInfo.errorMessage) {
        throw new Error(currentEducationInfo.errorMessage);
      }

      res.status(200).send(currentEducationInfo);
    } catch (error) {
      next(error);
    }
  },
);
EducationAuthRouter.get(
  '/Educationlist/:userId',
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      // 사용자의 전체 자격증 목록을 가져옴
      const Educations = await EducationAuthService.getEducations({
        userId,
      });

      if (Educations.errorMessage) {
        throw new Error(Educations.errorMessage);
      }
      res.status(200).send(Educations);
    } catch (error) {
      next(error);
    }
  },
);
EducationAuthRouter.put(
  '/Educations/:id',
  loginRequired,
  async (req, res, next) => {
    try {
      // URI로부터 자격증 id를 추출함.
      const id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const whenDate = req.body.whenDate ?? null;

      const toUpdate = { title, description, whenDate };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedEducation = await EducationAuthService.setEducation({
        id,
        toUpdate,
      });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  },
);

export { EducationAuthRouter };
