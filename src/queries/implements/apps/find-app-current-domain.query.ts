import { IQuery } from '@nestjs/cqrs';

export class FindAppCurrentDomainQuery implements IQuery {
  constructor(readonly appId: string) {}
}
