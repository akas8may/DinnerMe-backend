import {
  Controller,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')

export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Delete('delete/:id')
  async deleteUser(
    @Param('id') id: string,
  ) {

    return await this.usersService
    .deleteUser(id);

  }
}