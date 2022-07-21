import { IQuery } from '@nestjs/cqrs';

export class FindPaymentByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
