import { IQuery } from '@nestjs/cqrs';

export class FindAppBySlugQuery implements IQuery {
  constructor(readonly slug: string) {}
}
