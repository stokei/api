import { IQuery } from '@nestjs/cqrs';

export class FindCategoryByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
