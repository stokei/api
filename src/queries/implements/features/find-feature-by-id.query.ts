import { IQuery } from '@nestjs/cqrs';

export class FindFeatureByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
