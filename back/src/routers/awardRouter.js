import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { AwardService } from '../services/awardService';

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post('/award/create', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('Content-Type');
    }
    const { user_id, title, description } = req.body;
    const newAward = await AwardService.createAward({
      user_id,
      title,
      description,
    });
    res.status(201).json(newAward);
  } catch (err) {
    next(err);
  }
});

export { awardRouter };
