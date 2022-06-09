import { ICommand } from '@nestjs/cqrs';

import {
  UpdateLanguageDataDTO,
  UpdateLanguageDTO,
  UpdateLanguageWhereDTO
} from '@/dtos/languages/update-language.dto';

export class UpdateLanguageCommand implements ICommand, UpdateLanguageDTO {
  data: UpdateLanguageDataDTO;
  where: UpdateLanguageWhereDTO;
  constructor(data: UpdateLanguageDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
