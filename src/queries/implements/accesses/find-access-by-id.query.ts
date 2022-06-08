import { IQuery } from '@nestjs/cqrs';

export class FindAccessByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
