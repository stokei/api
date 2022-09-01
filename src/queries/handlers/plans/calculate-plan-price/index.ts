import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { defaultPlanPrices } from '@/constants/default-plan-prices';
import { CalculatePlanPriceResponse } from '@/dtos/plans/calculate-plan-price-response';
import { DataNotFoundException } from '@/errors';
import { CalculatePlanPriceQuery } from '@/queries/implements/plans/calculate-plan-price.query';

@QueryHandler(CalculatePlanPriceQuery)
export class CalculatePlanPriceQueryHandler
  implements IQueryHandler<CalculatePlanPriceQuery>
{
  async execute(
    query: CalculatePlanPriceQuery
  ): Promise<CalculatePlanPriceResponse> {
    if (!query) {
      throw new DataNotFoundException();
    }

    let totalPriceAmount = 0;
    if (query.hasCustomDomain) {
      totalPriceAmount += this.calculateCustomDomainPriceAmount();
    }
    if (query.hasCustomSite) {
      totalPriceAmount += this.calculateCustomSitePriceAmount();
    }
    if (query.quantityCourses >= 0) {
      totalPriceAmount += this.calculateQuantityCoursesPriceAmount({
        quantity: query.quantityCourses
      });
    }
    if (query.quantityInstructorPerCourses >= 0) {
      totalPriceAmount += this.calculateQuantityInstructorPerCoursesPriceAmount(
        { quantity: query.quantityInstructorPerCourses }
      );
    }
    if (query.quantityClassroomsPerCourses >= 0) {
      totalPriceAmount += this.calculateQuantityClassroomsPerCoursesPriceAmount(
        { quantity: query.quantityClassroomsPerCourses }
      );
    }
    if (query.quantityModulesPerClassrooms >= 0) {
      totalPriceAmount += this.calculateQuantityModulesPerClassroomsPriceAmount(
        { quantity: query.quantityModulesPerClassrooms }
      );
    }
    if (query.quantityVideosPerModules >= 0) {
      totalPriceAmount += this.calculateQuantityVideosPerModulesPriceAmount({
        quantity: query.quantityVideosPerModules
      });
    }

    const applicationFeePercentage = this.calculateApplicationFeePercentage();
    return {
      applicationFeePercentage,
      totalPriceAmount
    };
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
      defaultPlanPrices.quantityInstructorPerCourses.unitAmountInCents
    );
  }
  calculateQuantityClassroomsPerCoursesPriceAmount({
    quantity
  }: {
    quantity: number;
  }): number {
    return (
      quantity *
      defaultPlanPrices.quantityClassroomsPerCourses.unitAmountInCents
    );
  }
  calculateQuantityModulesPerClassroomsPriceAmount({
    quantity
  }: {
    quantity: number;
  }): number {
    return (
      quantity *
      defaultPlanPrices.quantityModulesPerClassrooms.unitAmountInCents
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
