import { ICommand } from '@nestjs/cqrs';
import {
  RemoveDomainDTO,
  RemoveDomainWhereDTO
} from '@/dtos/domains/remove-domain.dto';

export class RemoveDomainCommand implements ICommand, RemoveDomainDTO {
  where: RemoveDomainWhereDTO;
  constructor(data: RemoveDomainDTO) {
    this.where = data.where;
  }
}
