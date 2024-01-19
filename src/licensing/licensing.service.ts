import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDecoratorType } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseBuilder } from 'src/utils';
import { SubscribeToPlanDto } from './dtos/licensing.dto';

@Injectable()
export class LicensingService {
  constructor(private readonly prisma: PrismaService) {}

  async validateLicense(clientId: string): Promise<boolean> {
    let sub = await this.prisma.subscription.findFirst({
      where: {
        isActive: true,
        clientId,
      },
    });
    // Validate the license
    return sub ? true : false;
  }

  async checkFeatures(clientId: string, features: string[]): Promise<boolean> {
    let sub = await this.prisma.subscription.findFirst({
      where: {
        clientId: clientId,
        isActive: true,
      },
      include: {
        addOns: {
          include: {
            productAddon: true,
          },
        },
      },
    });

    let addOns = sub.addOns.map((x) => x.productAddon);
    // Check if the license has the required features
    return features.every((x) => addOns.some((y) => y.name === x));
  }

  async getPlans() {
    let plans = await this.prisma.pricingPlan.findMany({ include: { productAddons: true } });

    return ResponseBuilder(HttpStatus.OK, plans, 'success');
  }

  async subscribeToPlan(usr: UserDecoratorType, body: SubscribeToPlanDto) {
    let defaultAddOns = await this.prisma.productAddon.findMany({
      where: {
        isDefault: true,
      },
    });
  }

  async getModules() {
    let modules = await this.prisma.productAddon.findMany({
      include: {},
    });

    return ResponseBuilder(HttpStatus.OK, modules, 'success', { info: 'Modules retrieved successfully' });
  }
}
