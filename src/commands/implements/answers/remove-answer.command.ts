import { ICommand } from '@nestjs/cqrs';
import {
  RemoveAnswerDTO,
  RemoveAnswerWhereDTO
} from '@/dtos/answers/remove-answer.dto';

export class RemoveAnswerCommand implements ICommand, RemoveAnswerDTO {
  where: RemoveAnswerWhereDTO;
  constructor(data: RemoveAnswerDTO) {
    this.where = data.where;
  }
}
