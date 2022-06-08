import { IQuery } from '@nestjs/cqrs';

export class FindRatingByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
