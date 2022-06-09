import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IRatingModelData, RatingModel } from '@/models/rating.model';

export class RatingModelMock extends RatingModel {
  constructor(data?: Partial<IRatingModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Rating Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
