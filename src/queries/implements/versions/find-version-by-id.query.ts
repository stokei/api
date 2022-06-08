import { IQuery } from '@nestjs/cqrs';

export class FindVersionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
