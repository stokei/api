import { IQuery } from '@nestjs/cqrs';

export class FindCurrencyByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
