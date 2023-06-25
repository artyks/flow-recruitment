import { Request, Response, NextFunction } from 'express';
import { userFixture } from '@flow-recruitment/prisma/utilities';

export function mockUserOnReq(req: Request, res: Response, next: NextFunction) {
  Object.assign(req, { user: userFixture });
  next();
}
