import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseBuilder } from 'src/utils';
import { CreateOrganisationDTO } from './organisation.interface';
import { Prisma, RegistrationLevel } from '@prisma/client';
import { UserDecoratorType } from 'src/decorators/user.decorator';

@Injectable()
export class OrganisationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganisation(data: CreateOrganisationDTO, usr: UserDecoratorType) {
    let organisationData: Prisma.organisationUncheckedCreateInput = {
      name: data.name,
      address: data.address,
      registrationLevel: RegistrationLevel.DATA_ENTRY,
      accountType: data.accountType,
      clientId: generateClientID(),
      companySize: data.companySize,
      customerSize: data.customerSize,
      inventorySize: data.inventorySize,
      isActivate: false,
      numberOfTransactions: data.numberOfTransactions,
      numberOfVendors: data.numberOfVendors,
      payrollServicesRequired: false,
      state: data.state,
      transactionTypes: data.transactionTypes,
      sectorId: data.sectorId,
      userOrganisation: {
        create: {
          userId: usr.id,
        },
      },
      defaultCurrencyId: data.defaultCurrencyId,
    };

    const organisation = await this.prisma.organisation.create({ data: organisationData });
    return ResponseBuilder(HttpStatus.OK, organisation);
  }
}

// Generate unique 9 digit client ID
function generateClientID() {
  let clientID = Math.floor(Math.random() * 1000000000);
  return clientID.toString();
}
