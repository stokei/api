import { IQuery } from '@nestjs/cqrs';

export class FindPaymentMethodByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
