import { IQuery } from '@nestjs/cqrs';

export class FindUsageRecordByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
