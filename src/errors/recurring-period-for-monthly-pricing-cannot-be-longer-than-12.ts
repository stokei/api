import { BadRequestException } from '@nestjs/common';

export class RecurringPeriodForMonthlyPricingCannotBeLongerThan12Exception extends BadRequestException {
  constructor() {
    super('recurringPeriodForMonthlyPricingCannotBeLongerThan12');
  }
}
