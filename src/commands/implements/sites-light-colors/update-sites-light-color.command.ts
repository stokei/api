import { ICommand } from '@nestjs/cqrs';

import {
  UpdateSitesLightColorDataDTO,
  UpdateSitesLightColorDTO,
  UpdateSitesLightColorWhereDTO
} from '@/dtos/sites-light-colors/update-sites-light-color.dto';

export class UpdateSitesLightColorCommand
  implements ICommand, UpdateSitesLightColorDTO
{
  data: UpdateSitesLightColorDataDTO;
  where: UpdateSitesLightColorWhereDTO;
  constructor(data: UpdateSitesLightColorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
