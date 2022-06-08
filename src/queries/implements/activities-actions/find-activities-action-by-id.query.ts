import { IQuery } from '@nestjs/cqrs';

export class FindActivitiesActionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
