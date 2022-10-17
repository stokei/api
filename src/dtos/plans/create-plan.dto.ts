export interface CreatePlanDTO {
  app: string;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorsPerCourse: number;
  quantityModulesPerCourse: number;
  quantityVideosPerModules: number;
  createdBy: string;
}
