import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { ClassroomModuleEntity } from '@/entities';
import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindAllClassroomModulesQuery } from '@/queries/implements/classroom-modules/find-all-classroom-modules.query';

export class ClassroomModuleMapper {
  toFindAllQueryClean(
    query: FindAllClassroomModulesQuery
  ): FindAllClassroomModulesQuery {
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
          classroom: cleanWhereDataString(operatorData.classroom),
          module: cleanWhereDataSearch(operatorData.module),
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
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(classroomModule: ClassroomModuleEntity) {
    return (
      classroomModule &&
      new ClassroomModuleModel({
        ...classroomModule,
        updatedAt: convertToISODateString(classroomModule.updatedAt),
        createdAt: convertToISODateString(classroomModule.createdAt)
      })
    );
  }
  toModels(classroomModules: ClassroomModuleEntity[]) {
    return classroomModules?.length > 0
      ? classroomModules.map(this.toModel).filter(Boolean)
      : [];
  }
}
