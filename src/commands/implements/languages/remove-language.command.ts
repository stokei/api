import { ICommand } from '@nestjs/cqrs';
import {
  RemoveLanguageDTO,
  RemoveLanguageWhereDTO
} from '@/dtos/languages/remove-language.dto';

export class RemoveLanguageCommand implements ICommand, RemoveLanguageDTO {
  where: RemoveLanguageWhereDTO;
  constructor(data: RemoveLanguageDTO) {
    this.where = data.where;
  }
}
