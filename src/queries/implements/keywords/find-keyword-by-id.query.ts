import { IQuery } from '@nestjs/cqrs';

export class FindKeywordByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
