import { IQuery } from '@nestjs/cqrs';

export class FindMetatagByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
