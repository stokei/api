import { ICommand } from '@nestjs/cqrs';

import {
  RemoveSitesLightColorDTO,
  RemoveSitesLightColorWhereDTO
} from '@/dtos/sites-light-colors/remove-sites-light-color.dto';

export class RemoveSitesLightColorCommand
  implements ICommand, RemoveSitesLightColorDTO
{
  where: RemoveSitesLightColorWhereDTO;
  constructor(data: RemoveSitesLightColorDTO) {
    this.where = data.where;
  }
}
