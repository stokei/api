import { IQuery } from '@nestjs/cqrs';

export class FindCatalogByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
