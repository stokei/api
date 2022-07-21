import { IQuery } from '@nestjs/cqrs';

export class FindVideoByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
