import { Body, Controller, Post } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserDTO } from './dto/user-management.interface';

@Controller('user-management')
export class UserManagementController {
    constructor(private readonly service: UserManagementService) { }

    @Post('/create')
    async create(@Body() data: CreateUserDTO) {
        return await this.service.createUser(data)
    }
}
