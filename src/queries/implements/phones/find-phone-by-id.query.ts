import { IQuery } from '@nestjs/cqrs';

export class FindPhoneByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
