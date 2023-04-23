import { ICommand } from '@nestjs/cqrs';

import {
  UpdateHeroDataDTO,
  UpdateHeroDTO,
  UpdateHeroWhereDTO
} from '@/dtos/heros/update-hero.dto';

export class UpdateHeroCommand implements ICommand, UpdateHeroDTO {
  data: UpdateHeroDataDTO;
  where: UpdateHeroWhereDTO;
  constructor(data: UpdateHeroDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
