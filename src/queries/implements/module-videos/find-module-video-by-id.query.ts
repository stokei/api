import { IQuery } from '@nestjs/cqrs';

export class FindModuleVideoByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
