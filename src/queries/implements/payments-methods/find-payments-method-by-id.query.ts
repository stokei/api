import { IQuery } from '@nestjs/cqrs';

export class FindPaymentsMethodByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
