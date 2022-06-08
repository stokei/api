import { IQuery } from '@nestjs/cqrs';

export class FindProjectsMemberByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
