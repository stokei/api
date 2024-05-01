import { BadRequestException } from '@nestjs/common';

export class RecurringPeriodForYearlyPricingCannotBeLongerThan1Exception extends BadRequestException {
  constructor() {
    super('recurringPeriodForYearlyPricingCannotBeLongerThan1');
  }
}
