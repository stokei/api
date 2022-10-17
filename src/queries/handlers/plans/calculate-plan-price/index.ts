import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber,
  ParamNotFoundException
} from '@stokei/nestjs';

import { defaultPlanPrices } from '@/constants/default-plan-prices';
import { CalculatePlanPriceResponse } from '@/dtos/plans/calculate-plan-price-response';
import { CurrencyNotFoundException, DataNotFoundException } from '@/errors';
import { CalculatePlanPriceQuery } from '@/queries/implements/plans/calculate-plan-price.query';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';

@QueryHandler(CalculatePlanPriceQuery)
export class CalculatePlanPriceQueryHandler
  implements IQueryHandler<CalculatePlanPriceQuery>
{
  constructor(
    private readonly findCurrencyByIdService: FindCurrencyByIdService
  ) {}
  async execute(
    query: CalculatePlanPriceQuery
  ): Promise<CalculatePlanPriceResponse> {
    const data = this.clearData(query);
    if (!data) {
      throw new DataNotFoundException();
    }

    if (!data.currency) {
      throw new ParamNotFoundException('currency');
    }

    const currency = await this.findCurrencyByIdService.execute(data.currency);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    let totalPriceAmount = 1;
    if (data.hasCustomDomain) {
      totalPriceAmount += this.calculateCustomDomainPriceAmount();
    }
    if (data.hasCustomSite) {
      totalPriceAmount += this.calculateCustomSitePriceAmount();
    }
    if (data.quantityCourses >= 0) {
      totalPriceAmount += this.calculateQuantityCoursesPriceAmount({
        quantity: data.quantityCourses
      });
    }
    if (data.quantityInstructorsPerCourse >= 0) {
      totalPriceAmount += this.calculateQuantityInstructorPerCoursesPriceAmount(
        { quantity: data.quantityInstructorsPerCourse }
      );
    }
    if (data.quantityModulesPerCourse >= 0) {
      totalPriceAmount += this.calculateQuantityModulesPerClassroomsPriceAmount(
        { quantity: data.quantityModulesPerCourse }
      );
    }
    if (data.quantityVideosPerModules >= 0) {
      totalPriceAmount += this.calculateQuantityVideosPerModulesPriceAmount({
        quantity: data.quantityVideosPerModules
      });
    }

    const applicationFeePercentage = this.calculateApplicationFeePercentage();
    return {
      applicationFeePercentage,
      totalPriceAmount,
      currency
    };
  }

  private clearData(query: CalculatePlanPriceQuery): CalculatePlanPriceQuery {
    return cleanObject({
      currency: cleanValue(query?.currency),
      hasCustomDomain: cleanValueBoolean(query?.hasCustomDomain),
      hasCustomSite: cleanValueBoolean(query?.hasCustomSite),
      quantityCourses: cleanValueNumber(query?.quantityCourses),
      quantityInstructorsPerCourse: cleanValueNumber(
        query?.quantityInstructorsPerCourse
      ),
      quantityModulesPerCourse: cleanValueNumber(
        query?.quantityModulesPerCourse
      ),
      quantityVideosPerModules: cleanValueNumber(
        query?.quantityVideosPerModules
      )
    });
  }

  calculateApplicationFeePercentage(): number {
    return defaultPlanPrices.applicationFeePercentage.percentage;
  }

  calculateCustomDomainPriceAmount(): number {
    return defaultPlanPrices.hasCustomDomain.unitAmountInCents;
  }

  calculateCustomSitePriceAmount(): number {
    return defaultPlanPrices.hasCustomSite.unitAmountInCents;
  }

  calculateQuantityCoursesPriceAmount({
    quantity
  }: {
    quantity: number;
  }): number {
    return quantity * defaultPlanPrices.quantityCourses.unitAmountInCents;
  }
  calculateQuantityInstructorPerCoursesPriceAmount({
    quantity
  }: {
    quantity: number;
  }): number {
    return (
      quantity *
      defaultPlanPrices.quantityInstructorsPerCourse.unitAmountInCents
    );
  }

  calculateQuantityModulesPerClassroomsPriceAmount({
    quantity
  }: {
    quantity: number;
  }): number {
    return (
      quantity * defaultPlanPrices.quantityModulesPerCourse.unitAmountInCents
    );
  }
  calculateQuantityVideosPerModulesPriceAmount({
    quantity
  }: {
    quantity: number;
  }): number {
    return (
      quantity * defaultPlanPrices.quantityVideosPerModules.unitAmountInCents
    );
  }
}
