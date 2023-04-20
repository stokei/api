import { BadRequestException } from '@nestjs/common';

export class RecurringPeriodForWeeklyPricingCannotBeLongerThan52Exception extends BadRequestException {
  constructor() {
    super('recurringPeriodForWeeklyPricingCannotBeLongerThan52');
  }
}
