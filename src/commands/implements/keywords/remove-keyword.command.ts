import { ICommand } from '@nestjs/cqrs';
import {
  RemoveKeywordDTO,
  RemoveKeywordWhereDTO
} from '@/dtos/keywords/remove-keyword.dto';

export class RemoveKeywordCommand implements ICommand, RemoveKeywordDTO {
  where: RemoveKeywordWhereDTO;
  constructor(data: RemoveKeywordDTO) {
    this.where = data.where;
  }
}
