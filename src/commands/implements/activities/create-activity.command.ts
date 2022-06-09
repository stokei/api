import { ICommand } from '@nestjs/cqrs';

import { CreateActivityDTO } from '@/dtos/activities/create-activity.dto';

export class CreateActivityCommand implements ICommand, CreateActivityDTO {
  name: string;
  parent: string;

  constructor(data: CreateActivityDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
