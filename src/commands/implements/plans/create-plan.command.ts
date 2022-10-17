import { ICommand } from '@nestjs/cqrs';

import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';

export class CreatePlanCommand implements ICommand, CreatePlanDTO {
  app: string;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorsPerCourse: number;
  quantityModulesPerCourse: number;
  quantityVideosPerModules: number;
  createdBy: string;

  constructor(data: CreatePlanDTO) {
    this.app = data.app;
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorsPerCourse = data.quantityInstructorsPerCourse;
    this.quantityModulesPerCourse = data.quantityModulesPerCourse;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
    this.createdBy = data.createdBy;
  }
}
