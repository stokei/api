import { IQuery } from '@nestjs/cqrs';

export class FindAllComponentsByParentIdsQuery implements IQuery {
  constructor(readonly parentIds: string[]) {}
}
