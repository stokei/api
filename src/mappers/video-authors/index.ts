import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { VideoAuthorEntity } from '@/entities';
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindAllVideoAuthorsQuery } from '@/queries/implements/video-authors/find-all-video-authors.query';

export class VideoAuthorMapper {
  toFindAllQueryClean(
    query: FindAllVideoAuthorsQuery
  ): FindAllVideoAuthorsQuery {
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
          video: cleanWhereDataString(operatorData.video),
          author: cleanWhereDataString(operatorData.author),
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
  toModel(videoAuthor: VideoAuthorEntity) {
    return (
      videoAuthor &&
      new VideoAuthorModel({
        ...videoAuthor,
        updatedAt: convertToISODateString(videoAuthor.updatedAt),
        createdAt: convertToISODateString(videoAuthor.createdAt)
      })
    );
  }
  toModels(videoAuthors: VideoAuthorEntity[]) {
    return videoAuthors?.length > 0
      ? videoAuthors.map(this.toModel).filter(Boolean)
      : [];
  }
}
