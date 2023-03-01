import { IQuery } from '@nestjs/cqrs';

export class FindCatalogItemByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
