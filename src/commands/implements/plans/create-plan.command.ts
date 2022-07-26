import { ICommand } from '@nestjs/cqrs';

import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { PlanType } from '@/enums/plan-type.enum';

export class CreatePlanCommand implements ICommand, CreatePlanDTO {
  name: string;
  type: PlanType;
  checkoutVisible: boolean;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorPerCourses: number;
  quantityClassroomsPerCourses: number;
  quantityModulesPerClassrooms: number;
  quantityVideosPerModules: number;
  applicationFeePercentage: number;
  app: string;
  createdBy: string;

  constructor(data: CreatePlanDTO) {
    this.name = data.name;
    this.type = data.type;
    this.checkoutVisible = data.checkoutVisible;
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorPerCourses = data.quantityInstructorPerCourses;
    this.quantityClassroomsPerCourses = data.quantityClassroomsPerCourses;
    this.quantityModulesPerClassrooms = data.quantityModulesPerClassrooms;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
    this.applicationFeePercentage = data.applicationFeePercentage;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
