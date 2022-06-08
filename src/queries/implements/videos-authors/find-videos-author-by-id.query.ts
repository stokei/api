import { IQuery } from '@nestjs/cqrs';

export class FindVideosAuthorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
