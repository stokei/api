import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomDTO } from '@/dtos/classrooms/create-classroom.dto';

export class CreateClassroomCommand implements ICommand, CreateClassroomDTO {
  name: string;
  parent: string;

  constructor(data: CreateClassroomDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
