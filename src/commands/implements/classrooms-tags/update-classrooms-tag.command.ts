import { ICommand } from '@nestjs/cqrs';
import {
  UpdateClassroomsTagDTO,
  UpdateClassroomsTagDataDTO,
  UpdateClassroomsTagWhereDTO
} from '@/dtos/classrooms-tags/update-classrooms-tag.dto';

export class UpdateClassroomsTagCommand
  implements ICommand, UpdateClassroomsTagDTO
{
  data: UpdateClassroomsTagDataDTO;
  where: UpdateClassroomsTagWhereDTO;
  constructor(data: UpdateClassroomsTagDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
