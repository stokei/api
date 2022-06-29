import { ICommand } from '@nestjs/cqrs';

import { CreateCourseDTO } from '@/dtos/courses/create-course.dto';

export class CreateCourseCommand implements ICommand, CreateCourseDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateCourseDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
