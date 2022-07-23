import { ICommand } from '@nestjs/cqrs';

import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';

export class CreatePlanCommand implements ICommand, CreatePlanDTO {
  parent: string;
  name: string;
  type: PlanType;
  checkoutVisible: boolean;
  status: PlanStatus;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorPerCourses: number;
  quantityClassroomsPerCourses: number;
  quantityModulesPerClassrooms: number;
  quantityVideosPerModules: number;
  applicationFeePercentage: number;
  createdBy: string;

  constructor(data: CreatePlanDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.type = data.type;
    this.checkoutVisible = data.checkoutVisible;
    this.status = data.status;
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorPerCourses = data.quantityInstructorPerCourses;
    this.quantityClassroomsPerCourses = data.quantityClassroomsPerCourses;
    this.quantityModulesPerClassrooms = data.quantityModulesPerClassrooms;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
    this.applicationFeePercentage = data.applicationFeePercentage;
    this.createdBy = data.createdBy;
  }
}
