import { Body, Module, Post } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { CreateUserDTO } from './dto/user-management.interface';

@Module({
  providers: [UserManagementService],
  controllers: [UserManagementController]
})
export class UserManagementModule {
  constructor(private readonly service: UserManagementService) { }

  @Post('/create')
  async create(@Body() data: CreateUserDTO) {
    return await this.service.createUser(data)
  }
}
