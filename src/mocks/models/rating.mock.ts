import { RatingModel, IRatingModelData } from '@/models/rating.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
