import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { userEntity } from '../user.entity';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

export interface ExpressRequests extends Request {
  user?: userEntity;
}

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequests, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers['authorization'].split(' ')[1];
    try {
      const decode = verify(token, 'JWT_SECRET') as { email: string };
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
