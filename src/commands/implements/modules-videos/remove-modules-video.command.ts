import { ICommand } from '@nestjs/cqrs';

import {
  RemoveModulesVideoDTO,
  RemoveModulesVideoWhereDTO
} from '@/dtos/modules-videos/remove-modules-video.dto';

export class RemoveModulesVideoCommand
  implements ICommand, RemoveModulesVideoDTO
{
  where: RemoveModulesVideoWhereDTO;
  constructor(data: RemoveModulesVideoDTO) {
    this.where = data.where;
  }
}
