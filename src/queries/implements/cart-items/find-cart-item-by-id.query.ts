import { IQuery } from '@nestjs/cqrs';

export class FindCartItemByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
