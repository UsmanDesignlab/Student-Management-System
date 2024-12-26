import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtPayload, Roles } from 'src/constants';

export function LoggedInMiddleWare(req: any, res: Response, next: NextFunction) {
  if (!req.cookies?.token) {
    return res.status(401).send('You are not logged in');
  }
  try {
    const data = jwt.verify(req.cookies.token, 'secret')
    req.user = data;
    //New user
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}
