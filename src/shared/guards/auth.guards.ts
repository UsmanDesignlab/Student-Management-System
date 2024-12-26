import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Roles, jwtPayload } from "src/constants";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: Roles[]) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const data: jwtPayload = jwt.verify(token, "secret") as jwtPayload;

      if (this.allowedRoles.includes(data.loggedInAs)) {
        return true;
      }
      throw new UnauthorizedException('Access denied. Insufficient role privileges');
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
