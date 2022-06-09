import { ICommand } from '@nestjs/cqrs';

import {
  UpdateSitesDarkColorDataDTO,
  UpdateSitesDarkColorDTO,
  UpdateSitesDarkColorWhereDTO
} from '@/dtos/sites-dark-colors/update-sites-dark-color.dto';

export class UpdateSitesDarkColorCommand
  implements ICommand, UpdateSitesDarkColorDTO
{
  data: UpdateSitesDarkColorDataDTO;
  where: UpdateSitesDarkColorWhereDTO;
  constructor(data: UpdateSitesDarkColorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
