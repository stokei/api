import { ICommand } from '@nestjs/cqrs';

import { CreateAnswerDTO } from '@/dtos/answers/create-answer.dto';

export class CreateAnswerCommand implements ICommand, CreateAnswerDTO {
  name: string;
  parent: string;

  constructor(data: CreateAnswerDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
