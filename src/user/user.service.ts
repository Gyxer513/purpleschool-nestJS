import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.model';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: UserDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
      role: dto.role,
    });
    return newUser.save();
  }

  async findUser(email: any) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string) {
    return this.userModel.findById(id);
  }
}
