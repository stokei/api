import { IQuery } from '@nestjs/cqrs';

export class FindVideosMaterialByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
