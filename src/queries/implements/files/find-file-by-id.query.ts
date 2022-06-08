import { IQuery } from '@nestjs/cqrs';

export class FindFileByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
