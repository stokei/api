import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomsTagDTO,
  RemoveClassroomsTagWhereDTO
} from '@/dtos/classrooms-tags/remove-classrooms-tag.dto';

export class RemoveClassroomsTagCommand
  implements ICommand, RemoveClassroomsTagDTO
{
  where: RemoveClassroomsTagWhereDTO;
  constructor(data: RemoveClassroomsTagDTO) {
    this.where = data.where;
  }
}
