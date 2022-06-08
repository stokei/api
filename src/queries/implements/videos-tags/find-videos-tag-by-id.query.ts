import { IQuery } from '@nestjs/cqrs';

export class FindVideosTagByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
