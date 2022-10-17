import { IQuery } from '@nestjs/cqrs';

import { CalculatePlanPriceDTO } from '@/dtos/plans/calculate-plan-price.dto';

export class CalculatePlanPriceQuery implements IQuery, CalculatePlanPriceDTO {
  currency: string;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorsPerCourse: number;
  quantityModulesPerCourse: number;
  quantityVideosPerModules: number;

  constructor(data: CalculatePlanPriceDTO) {
    this.currency = data.currency;
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorsPerCourse = data.quantityInstructorsPerCourse;
    this.quantityModulesPerCourse = data.quantityModulesPerCourse;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
  }
}
