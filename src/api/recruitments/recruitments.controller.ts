import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
  Router,
} from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { MESSAGES } from '../../shared/constants';
import { recruitmentSchema } from './recruitments.schema';
import { createRecruitment, getRecruitments } from './recruitments.service';

const handleCreateRecruitment: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await createRecruitment(req.body);
    res.status(200).json({
      message: MESSAGES.REGISTRATION_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetRecruitments: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const password = req.params.password;
    const result = await getRecruitments(password);
    res.status(200).json({
      message: MESSAGES.FETCHED_USERS_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default (): Router => {
  const app = Router();
  app.post(
    '/create',
    validateRequest('body', recruitmentSchema) as RequestHandler,
    handleCreateRecruitment,
  );
  app.get('/data/:password', handleGetRecruitments);
  return app;
};
