import { ICommand } from '@nestjs/cqrs';

import { CreateLanguageDTO } from '@/dtos/languages/create-language.dto';

export class CreateLanguageCommand implements ICommand, CreateLanguageDTO {
  id: string;
  name: string;
  icon?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateLanguageDTO) {
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
