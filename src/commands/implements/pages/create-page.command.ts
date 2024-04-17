import { ICommand } from '@nestjs/cqrs';

import { CreatePageDTO } from '@/dtos/pages/create-page.dto';
import { PageType } from '@/enums/page-type.enum';

export class CreatePageCommand implements ICommand, CreatePageDTO {
  parent: string;
  title: string;
  url?: string;
  type?: PageType;
  app: string;
  createdBy: string;

  constructor(data: CreatePageDTO) {
    this.parent = data.parent;
    this.title = data.title;
    this.url = data.url;
    this.type = data.type;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
