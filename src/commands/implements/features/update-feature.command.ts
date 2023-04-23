import { ICommand } from '@nestjs/cqrs';

import {
  UpdateFeatureDataDTO,
  UpdateFeatureDTO,
  UpdateFeatureWhereDTO
} from '@/dtos/features/update-feature.dto';

export class UpdateFeatureCommand implements ICommand, UpdateFeatureDTO {
  data: UpdateFeatureDataDTO;
  where: UpdateFeatureWhereDTO;
  constructor(data: UpdateFeatureDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
