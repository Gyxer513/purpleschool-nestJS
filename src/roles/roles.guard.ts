import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { User } from 'src/user/entities/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user }: { user: User } = await context.switchToHttp().getRequest();

    let userData: User = await this.userService.findUser(user);
    if (userData?.role !== Role.ADMIN) {
      throw new HttpException(
        `только администарторы могут удалять комнааты`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
