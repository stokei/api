import { ICommand } from '@nestjs/cqrs';
import {
  UpdateModulesVideoDTO,
  UpdateModulesVideoDataDTO,
  UpdateModulesVideoWhereDTO
} from '@/dtos/modules-videos/update-modules-video.dto';

export class UpdateModulesVideoCommand
  implements ICommand, UpdateModulesVideoDTO
{
  data: UpdateModulesVideoDataDTO;
  where: UpdateModulesVideoWhereDTO;
  constructor(data: UpdateModulesVideoDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
