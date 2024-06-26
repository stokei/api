import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePluginDataDTO,
  UpdatePluginDTO,
  UpdatePluginWhereDTO
} from '@/dtos/plugins/update-plugin.dto';

export class UpdatePluginCommand implements ICommand, UpdatePluginDTO {
  data: UpdatePluginDataDTO;
  where: UpdatePluginWhereDTO;
  constructor(data: UpdatePluginDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
