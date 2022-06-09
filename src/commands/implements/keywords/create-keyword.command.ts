import { ICommand } from '@nestjs/cqrs';

import { CreateKeywordDTO } from '@/dtos/keywords/create-keyword.dto';

export class CreateKeywordCommand implements ICommand, CreateKeywordDTO {
  name: string;
  parent: string;

  constructor(data: CreateKeywordDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
