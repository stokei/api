import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCourseDataDTO,
  UpdateCourseDTO,
  UpdateCourseWhereDTO
} from '@/dtos/courses/update-course.dto';

export class UpdateCourseCommand implements ICommand, UpdateCourseDTO {
  data: UpdateCourseDataDTO;
  where: UpdateCourseWhereDTO;
  constructor(data: UpdateCourseDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
