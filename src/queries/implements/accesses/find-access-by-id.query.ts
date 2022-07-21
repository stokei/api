import { IQuery } from '@nestjs/cqrs';

export class FindAccessByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
