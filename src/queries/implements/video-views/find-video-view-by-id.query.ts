import { IQuery } from '@nestjs/cqrs';

export class FindVideoViewByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
