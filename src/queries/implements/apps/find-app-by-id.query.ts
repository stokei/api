import { IQuery } from '@nestjs/cqrs';

export class FindAppByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
