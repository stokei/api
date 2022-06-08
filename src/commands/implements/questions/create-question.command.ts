import { ICommand } from '@nestjs/cqrs';
import { CreateQuestionDTO } from '@/dtos/questions/create-question.dto';

export class CreateQuestionCommand implements ICommand, CreateQuestionDTO {
  name: string;
  parent: string;

  constructor(data: CreateQuestionDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
