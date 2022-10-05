import { IQuery } from '@nestjs/cqrs';

export class FindFileByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
