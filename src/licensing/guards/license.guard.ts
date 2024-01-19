// license.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LicensingService } from '../licensing.service';

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private licenseService: LicensingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the license from the request headers
    const request = context.switchToHttp().getRequest();
    const user = request.headers['user'];

    // Validate the license using the license service
    const isValid = await this.licenseService.validateLicense(user.clientId);
    if (!isValid) {
      return false;
    }

    // Get the required features from the route metadata
    const features = this.reflector.get<string[]>('features', context.getHandler());

    // Check if the license has the required features
    const hasFeatures = await this.licenseService.checkFeatures(user.clientId, features);
    if (!hasFeatures) {
      return false;
    }

    // Return true if the license is valid and has the required features
    return true;
  }
}
