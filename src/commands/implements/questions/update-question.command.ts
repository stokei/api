import { ICommand } from '@nestjs/cqrs';

import {
  UpdateQuestionDataDTO,
  UpdateQuestionDTO,
  UpdateQuestionWhereDTO
} from '@/dtos/questions/update-question.dto';

export class UpdateQuestionCommand implements ICommand, UpdateQuestionDTO {
  data: UpdateQuestionDataDTO;
  where: UpdateQuestionWhereDTO;
  constructor(data: UpdateQuestionDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
