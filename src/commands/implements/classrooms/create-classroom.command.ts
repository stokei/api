import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomDTO } from '@/dtos/classrooms/create-classroom.dto';

export class CreateClassroomCommand implements ICommand, CreateClassroomDTO {
  name: string;
  parent: string;
  description?: string;
  hasAccessToAllModules?: boolean;
  app: string;
  createdBy: string;

  constructor(data: CreateClassroomDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.description = data.description;
    this.hasAccessToAllModules = data.hasAccessToAllModules;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
