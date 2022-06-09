import { ICommand } from '@nestjs/cqrs';

import {
  RemoveQuestionDTO,
  RemoveQuestionWhereDTO
} from '@/dtos/questions/remove-question.dto';

export class RemoveQuestionCommand implements ICommand, RemoveQuestionDTO {
  where: RemoveQuestionWhereDTO;
  constructor(data: RemoveQuestionDTO) {
    this.where = data.where;
  }
}
