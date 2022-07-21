import { IQuery } from '@nestjs/cqrs';

export class FindPhoneByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
