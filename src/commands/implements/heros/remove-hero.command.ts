import { ICommand } from '@nestjs/cqrs';

import {
  RemoveHeroDTO,
  RemoveHeroWhereDTO
} from '@/dtos/heros/remove-hero.dto';

export class RemoveHeroCommand implements ICommand, RemoveHeroDTO {
  where: RemoveHeroWhereDTO;
  constructor(data: RemoveHeroDTO) {
    this.where = data.where;
  }
}
