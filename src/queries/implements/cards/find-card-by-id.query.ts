import { IQuery } from '@nestjs/cqrs';

export class FindCardByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
