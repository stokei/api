import { IQuery } from '@nestjs/cqrs';

export class FindPaymentMethodByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
