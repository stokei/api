import { IQuery } from '@nestjs/cqrs';

export class FindRecurringByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
