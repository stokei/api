import { IntervalType } from '@/enums/interval-type.enum';
import {
  RecurringPeriodForDailyPricingCannotBeLongerThan365Exception,
  RecurringPeriodForMonthlyPricingCannotBeLongerThan12Exception,
  RecurringPeriodForWeeklyPricingCannotBeLongerThan52Exception,
  RecurringPeriodForYearlyPricingCannotBeLongerThan1Exception
} from '@/errors';

export interface IsValidRecurringPeriodData {
  interval: IntervalType;
  intervalCount: number;
}

export const isValidRecurringPeriod = (data: IsValidRecurringPeriodData) => {
  if (data.interval === IntervalType.DAY && data.intervalCount > 365) {
    throw new RecurringPeriodForDailyPricingCannotBeLongerThan365Exception();
  }
  if (data.interval === IntervalType.WEEK && data.intervalCount > 52) {
    throw new RecurringPeriodForWeeklyPricingCannotBeLongerThan52Exception();
  }
  if (data.interval === IntervalType.MONTH && data.intervalCount > 12) {
    throw new RecurringPeriodForMonthlyPricingCannotBeLongerThan12Exception();
  }
  if (data.interval === IntervalType.YEAR && data.intervalCount > 1) {
    throw new RecurringPeriodForYearlyPricingCannotBeLongerThan1Exception();
  }
  return true;
};
