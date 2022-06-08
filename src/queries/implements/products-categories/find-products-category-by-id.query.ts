import { IQuery } from '@nestjs/cqrs';

export class FindProductsCategoryByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
