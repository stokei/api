import { IQuery } from '@nestjs/cqrs';

import { CalculatePlanPriceDTO } from '@/dtos/plans/calculate-plan-price.dto';

export class CalculatePlanPriceQuery implements IQuery, CalculatePlanPriceDTO {
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorPerCourses: number;
  quantityClassroomsPerCourses: number;
  quantityModulesPerClassrooms: number;
  quantityVideosPerModules: number;

  constructor(data: CalculatePlanPriceDTO) {
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorPerCourses = data.quantityInstructorPerCourses;
    this.quantityClassroomsPerCourses = data.quantityClassroomsPerCourses;
    this.quantityModulesPerClassrooms = data.quantityModulesPerClassrooms;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
  }
}
