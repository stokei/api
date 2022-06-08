import { IQuery } from '@nestjs/cqrs';

export class FindTagByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
