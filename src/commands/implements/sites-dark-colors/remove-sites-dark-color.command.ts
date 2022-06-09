import { ICommand } from '@nestjs/cqrs';

import {
  RemoveSitesDarkColorDTO,
  RemoveSitesDarkColorWhereDTO
} from '@/dtos/sites-dark-colors/remove-sites-dark-color.dto';

export class RemoveSitesDarkColorCommand
  implements ICommand, RemoveSitesDarkColorDTO
{
  where: RemoveSitesDarkColorWhereDTO;
  constructor(data: RemoveSitesDarkColorDTO) {
    this.where = data.where;
  }
}
