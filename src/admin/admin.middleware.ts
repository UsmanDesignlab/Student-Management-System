import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtPayload, Roles } from 'src/constants';

export function AdminMiddleware(req: any, res: Response, next: NextFunction) {
  try {
    const data: jwtPayload = jwt.verify(req.cookies.token, 'secret') as jwtPayload;

    if (data.loggedInAs === Roles.ADMIN) {
      return next();
    }else{
      return res.status(HttpStatus.FORBIDDEN).send("You are not an Admin");
    }
  } catch (error) {
    throw new HttpException(
      error.message || "Unexpected error occurred",
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
