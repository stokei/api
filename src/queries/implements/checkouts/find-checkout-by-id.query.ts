import { IQuery } from '@nestjs/cqrs';

export class FindCheckoutByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
