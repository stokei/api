import { ICommand } from '@nestjs/cqrs';

import { CreateLoginPageDTO } from '@/dtos/pages/create-login-page.dto';

export class CreateLoginPageCommand implements ICommand, CreateLoginPageDTO {
  parent: string;
  app: string;
  createdBy: string;

  constructor(data: CreateLoginPageDTO) {
    this.parent = data.parent;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
