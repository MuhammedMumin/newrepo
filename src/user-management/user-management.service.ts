import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/user-management.interface';
import { ResponseBuilder } from 'src/utils';

@Injectable()
export class UserManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO) {
    const organisation = await this.prisma.organisation.findUnique({ where: { id: data.organisationId } });
    if (!organisation) return ResponseBuilder(HttpStatus.BAD_REQUEST, 'Invalid organisation identifier');
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        credentialId: data.credentialId,
      },
    });

    const userOrganisation = await this.prisma.userOrganisation.create({
      data: {
        userId: Number(user.id),
        organisationId: data.organisationId,
      },
    });

    return ResponseBuilder(HttpStatus.OK, user, 'success');
  }
}
