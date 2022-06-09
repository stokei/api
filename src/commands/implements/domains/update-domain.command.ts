import { ICommand } from '@nestjs/cqrs';

import {
  UpdateDomainDataDTO,
  UpdateDomainDTO,
  UpdateDomainWhereDTO
} from '@/dtos/domains/update-domain.dto';

export class UpdateDomainCommand implements ICommand, UpdateDomainDTO {
  data: UpdateDomainDataDTO;
  where: UpdateDomainWhereDTO;
  constructor(data: UpdateDomainDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
