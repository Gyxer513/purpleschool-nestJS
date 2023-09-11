import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { Role } from 'src/user/entities/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly userService: UserService, private reflector: Reflector) {}

  canActivate(content: ExecutionContext): boolean {
    const request = content.switchToHttp().getRequest();
    console.log(request.user);

    return true;
  }
}
