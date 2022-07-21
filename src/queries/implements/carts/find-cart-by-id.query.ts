import { IQuery } from '@nestjs/cqrs';

export class FindCartByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
