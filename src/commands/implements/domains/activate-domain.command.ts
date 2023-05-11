import { ICommand } from '@nestjs/cqrs';

import { ActivateDomainDTO } from '@/dtos/domains/activate-domain.dto';

export class ActivateDomainCommand implements ICommand, ActivateDomainDTO {
  updatedBy: string;
  app: string;
  domain: string;

  constructor(data: ActivateDomainDTO) {
    this.updatedBy = data.updatedBy;
    this.app = data.app;
    this.domain = data.domain;
  }
}
