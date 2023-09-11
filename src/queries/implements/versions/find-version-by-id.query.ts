import { IQuery } from '@nestjs/cqrs';

export class FindVersionByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
