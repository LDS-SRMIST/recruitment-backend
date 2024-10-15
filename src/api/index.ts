import { Router } from 'express';
import demoController from './demo/demo.controller';
import recruitmentsController from './recruitments/recruitments.controller';

export default (): Router => {
  const app = Router();
  app.use('/demo', demoController());
  app.use('/recruitments', recruitmentsController());
  return app;
};
