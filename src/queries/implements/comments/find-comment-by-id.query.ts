import { IQuery } from '@nestjs/cqrs';

export class FindCommentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
