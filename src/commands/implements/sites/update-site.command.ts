import { ICommand } from '@nestjs/cqrs';
import {
  UpdateSiteDTO,
  UpdateSiteDataDTO,
  UpdateSiteWhereDTO
} from '@/dtos/sites/update-site.dto';

export class UpdateSiteCommand implements ICommand, UpdateSiteDTO {
  data: UpdateSiteDataDTO;
  where: UpdateSiteWhereDTO;
  constructor(data: UpdateSiteDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
