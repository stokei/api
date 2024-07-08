import { IQuery } from '@nestjs/cqrs';

export class FindPluginByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
