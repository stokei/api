export interface CalculatePlanPriceDTO {
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorPerCourses: number;
  quantityClassroomsPerCourses: number;
  quantityModulesPerClassrooms: number;
  quantityVideosPerModules: number;
}
