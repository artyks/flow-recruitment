import { UsersService } from '@flow-recruitment/users/services';
import { Module } from '@nestjs/common';

@Module({
  providers: [UsersService],
})
export class UsersModule {}
