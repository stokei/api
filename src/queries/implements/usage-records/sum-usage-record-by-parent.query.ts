import { IQuery } from '@nestjs/cqrs';

export class SumUsageRecordByParentQuery implements IQuery {
  constructor(readonly parent: string) {}
}
