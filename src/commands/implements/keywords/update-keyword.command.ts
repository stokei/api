import { ICommand } from '@nestjs/cqrs';

import {
  UpdateKeywordDataDTO,
  UpdateKeywordDTO,
  UpdateKeywordWhereDTO
} from '@/dtos/keywords/update-keyword.dto';

export class UpdateKeywordCommand implements ICommand, UpdateKeywordDTO {
  data: UpdateKeywordDataDTO;
  where: UpdateKeywordWhereDTO;
  constructor(data: UpdateKeywordDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
