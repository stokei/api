import { IQuery } from '@nestjs/cqrs';

export class FindCouponByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
