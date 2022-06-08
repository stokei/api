import { ICommand } from '@nestjs/cqrs';
import {
  UpdateQuestionDTO,
  UpdateQuestionDataDTO,
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
