import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllPlansDTO {
  ids?: string[];
  product?: IWhereData;
  price?: IWhereData;
  name?: IWhereData;
  active?: IWhereData<boolean>;
  hasCustomDomain?: IWhereData<boolean>;
  hasCustomSite?: IWhereData<boolean>;
  quantityCourses?: IWhereData<number>;
  quantityInstructorsPerCourse?: IWhereData<number>;
  quantityModulesPerCourse?: IWhereData<number>;
  quantityVideosPerModules?: IWhereData<number>;
  applicationFeePercentage?: IWhereData<number>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPlansDTO = keyof WhereDataFindAllPlansDTO;

export interface OrderByDataFindAllPlansDTO {
  name?: IOrderBy;
  active?: IOrderBy;
  hasCustomDomain?: IOrderBy;
  hasCustomSite?: IOrderBy;
  quantityCourses?: IOrderBy;
  quantityInstructorsPerCourse?: IOrderBy;
  quantityClassroomsPerCourses?: IOrderBy;
  quantityModulesPerCourse?: IOrderBy;
  quantityVideosPerModules?: IOrderBy;
  applicationFeePercentage?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPlansDTO = keyof OrderByDataFindAllPlansDTO;

export type FindAllPlansDTO = IBaseFindManyDTO<
  WhereDataFindAllPlansDTO,
  OrderByDataFindAllPlansDTO
>;
