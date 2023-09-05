import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.model';
import { Model } from 'mongoose';
import {} from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private roomEntity: Model<UserDocument>,
      ) {}

}
