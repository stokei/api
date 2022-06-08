import { ICommand } from '@nestjs/cqrs';
import {
  UpdateAnswerDTO,
  UpdateAnswerDataDTO,
  UpdateAnswerWhereDTO
} from '@/dtos/answers/update-answer.dto';

export class UpdateAnswerCommand implements ICommand, UpdateAnswerDTO {
  data: UpdateAnswerDataDTO;
  where: UpdateAnswerWhereDTO;
  constructor(data: UpdateAnswerDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
