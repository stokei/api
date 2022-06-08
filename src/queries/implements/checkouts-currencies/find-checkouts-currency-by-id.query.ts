import { IQuery } from '@nestjs/cqrs';

export class FindCheckoutsCurrencyByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
