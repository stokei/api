import { ICommand } from '@nestjs/cqrs';

import {
  RemoveAppInstructorDTO,
  RemoveAppInstructorWhereDTO
} from '@/dtos/app-instructors/remove-app-instructor.dto';

export class RemoveAppInstructorCommand
  implements ICommand, RemoveAppInstructorDTO
{
  where: RemoveAppInstructorWhereDTO;
  constructor(data: RemoveAppInstructorDTO) {
    this.where = data.where;
  }
}
