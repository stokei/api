import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCourseDTO,
  RemoveCourseWhereDTO
} from '@/dtos/courses/remove-course.dto';

export class RemoveCourseCommand implements ICommand, RemoveCourseDTO {
  where: RemoveCourseWhereDTO;
  constructor(data: RemoveCourseDTO) {
    this.where = data.where;
  }
}
