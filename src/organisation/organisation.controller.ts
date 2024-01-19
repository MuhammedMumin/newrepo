import { Controller } from '@nestjs/common';
import { CreateOrganisationDTO } from './organisation.interface';
import { User, UserDecoratorType } from 'src/decorators/user.decorator';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly service: OrganisationService) {}

  async createOrganisation(dto: CreateOrganisationDTO, @User() usr: UserDecoratorType) {}
}
