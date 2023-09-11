import { ICommand } from '@nestjs/cqrs';

import { CreatePageDTO } from '@/dtos/pages/create-page.dto';

export class CreatePageCommand implements ICommand, CreatePageDTO {
  parent: string;
  title: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePageDTO) {
    this.parent = data.parent;
    this.title = data.title;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
