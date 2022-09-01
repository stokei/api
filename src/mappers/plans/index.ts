import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataNumber,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllPlansDTO,
  WhereDataFindAllPlansDTO
} from '@/dtos/plans/find-all-plans.dto';
import { PlanEntity } from '@/entities';
import { PlanModel } from '@/models/plan.model';
import { FindAllPlansQuery } from '@/queries/implements/plans/find-all-plans.query';

export class PlanMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPlansDTO>) {
    const prismaMapper = new PrismaMapper();
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        active: prismaMapper.toWhereData(operatorData.active),
        hasCustomDomain: prismaMapper.toWhereData(operatorData.hasCustomDomain),
        hasCustomSite: prismaMapper.toWhereData(operatorData.hasCustomSite),
        quantityCourses: prismaMapper.toWhereData(operatorData.quantityCourses),
        quantityInstructorPerCourses: prismaMapper.toWhereData(
          operatorData.quantityInstructorPerCourses
        ),
        quantityClassroomsPerCourses: prismaMapper.toWhereData(
          operatorData.quantityClassroomsPerCourses
        ),
        quantityModulesPerClassrooms: prismaMapper.toWhereData(
          operatorData.quantityModulesPerClassrooms
        ),
        quantityVideosPerModules: prismaMapper.toWhereData(
          operatorData.quantityVideosPerModules
        ),
        applicationFeePercentage: prismaMapper.toWhereData(
          operatorData.applicationFeePercentage
        ),
        app: prismaMapper.toWhereData(operatorData.app),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
    });
  }
  toFindAllPrisma(data: FindAllPlansDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPlansQuery): FindAllPlansQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          active: cleanWhereDataBoolean(operatorData.active),
          hasCustomDomain: cleanWhereDataBoolean(operatorData.hasCustomDomain),
          hasCustomSite: cleanWhereDataBoolean(operatorData.hasCustomSite),
          quantityCourses: cleanWhereDataNumber(operatorData.quantityCourses),
          quantityInstructorPerCourses: cleanWhereDataNumber(
            operatorData.quantityInstructorPerCourses
          ),
          quantityClassroomsPerCourses: cleanWhereDataNumber(
            operatorData.quantityClassroomsPerCourses
          ),
          quantityModulesPerClassrooms: cleanWhereDataNumber(
            operatorData.quantityModulesPerClassrooms
          ),
          quantityVideosPerModules: cleanWhereDataNumber(
            operatorData.quantityVideosPerModules
          ),
          applicationFeePercentage: cleanWhereDataNumber(
            operatorData.applicationFeePercentage
          ),
          app: cleanWhereDataString(operatorData.app),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        active: cleanSortValue(query.orderBy?.active),
        hasCustomDomain: cleanSortValue(query.orderBy?.hasCustomDomain),
        hasCustomSite: cleanSortValue(query.orderBy?.hasCustomSite),
        quantityCourses: cleanSortValue(query.orderBy?.quantityCourses),
        quantityInstructorPerCourses: cleanSortValue(
          query.orderBy?.quantityInstructorPerCourses
        ),
        quantityClassroomsPerCourses: cleanSortValue(
          query.orderBy?.quantityClassroomsPerCourses
        ),
        quantityModulesPerClassrooms: cleanSortValue(
          query.orderBy?.quantityModulesPerClassrooms
        ),
        quantityVideosPerModules: cleanSortValue(
          query.orderBy?.quantityVideosPerModules
        ),
        applicationFeePercentage: cleanSortValue(
          query.orderBy?.applicationFeePercentage
        ),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(plan: PlanEntity) {
    return plan && new PlanModel(plan);
  }
  toModels(plans: PlanEntity[]) {
    return plans?.length > 0 ? plans.map(this.toModel).filter(Boolean) : [];
  }
}
