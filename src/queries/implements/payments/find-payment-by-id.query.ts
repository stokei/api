import { IQuery } from '@nestjs/cqrs';

export class FindPaymentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
