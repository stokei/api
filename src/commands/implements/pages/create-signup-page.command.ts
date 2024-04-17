import { ICommand } from '@nestjs/cqrs';

import { CreateSignUpPageDTO } from '@/dtos/pages/create-signup-page.dto';

export class CreateSignUpPageCommand implements ICommand, CreateSignUpPageDTO {
  parent: string;
  app: string;
  createdBy: string;

  constructor(data: CreateSignUpPageDTO) {
    this.parent = data.parent;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
