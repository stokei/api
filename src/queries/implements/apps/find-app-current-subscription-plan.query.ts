import { IQuery } from '@nestjs/cqrs';

export class FindAppCurrentSubscriptionPlanQuery implements IQuery {
  constructor(readonly appId: string) {}
}
