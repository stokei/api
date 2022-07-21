import { IQuery } from '@nestjs/cqrs';

export class FindProjectByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
