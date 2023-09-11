import { IQuery } from '@nestjs/cqrs';

export class FindPageByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
