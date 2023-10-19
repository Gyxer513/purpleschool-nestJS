import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
        `это действие доступно только администарторам`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
