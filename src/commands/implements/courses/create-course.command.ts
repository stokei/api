import { ICommand } from '@nestjs/cqrs';

import { CreateCourseDTO } from '@/dtos/courses/create-course.dto';

export class CreateCourseCommand implements ICommand, CreateCourseDTO {
  name: string;
  parent: string;
  description?: string;
  avatar?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateCourseDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.description = data.description;
    this.avatar = data.avatar;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
