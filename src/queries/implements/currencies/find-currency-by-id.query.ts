import { IQuery } from '@nestjs/cqrs';

export class FindCurrencyByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
