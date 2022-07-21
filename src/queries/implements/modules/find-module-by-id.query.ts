import { IQuery } from '@nestjs/cqrs';

export class FindModuleByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
