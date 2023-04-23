export interface CalculatePlanPriceDTO {
  currency: string;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorsPerCourse: number;
  quantityModulesPerCourse: number;
  quantityVideosPerModules: number;
}
