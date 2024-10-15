import type { NextFunction, Request, Response } from 'express';
import type { z } from 'zod';
import { ERRORS } from '../shared/constants';

type Location = 'query' | 'body' | 'params';

export function validateRequest(location: Location, schema: z.AnyZodObject) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<unknown> => {
    try {
      const validatedSchema = await schema.parseAsync(req[location]);
      req[location] = validatedSchema;
      next();
    } catch (error) {
      return res.status(ERRORS.MISDIRECTED_REQUEST.statusCode).json({
        success: false,
        error,
      });
    }
  };
}
