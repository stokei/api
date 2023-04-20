import { BadRequestException } from '@nestjs/common';

export class RecurringPeriodForDailyPricingCannotBeLongerThan365Exception extends BadRequestException {
  constructor() {
    super('recurringPeriodForDailyPricingCannotBeLongerThan365');
  }
}
