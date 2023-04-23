import { ICommand } from '@nestjs/cqrs';

import {
  RemoveFeatureDTO,
  RemoveFeatureWhereDTO
} from '@/dtos/features/remove-feature.dto';

export class RemoveFeatureCommand implements ICommand, RemoveFeatureDTO {
  where: RemoveFeatureWhereDTO;
  constructor(data: RemoveFeatureDTO) {
    this.where = data.where;
  }
}
