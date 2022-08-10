import { IQuery } from '@nestjs/cqrs';

export class FindAppCurrentPlanQuery implements IQuery {
  constructor(readonly appId: string) {}
}
