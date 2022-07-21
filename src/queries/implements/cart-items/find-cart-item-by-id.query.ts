import { IQuery } from '@nestjs/cqrs';

export class FindCartItemByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
