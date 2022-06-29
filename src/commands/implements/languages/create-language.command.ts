import { ICommand } from '@nestjs/cqrs';

import { CreateLanguageDTO } from '@/dtos/languages/create-language.dto';

export class CreateLanguageCommand implements ICommand, CreateLanguageDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateLanguageDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
