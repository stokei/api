import { convertToISODateString } from '@stokei/nestjs';

import { KeywordEntity } from '@/entities';
import { KeywordModel } from '@/models/keyword.model';

export class KeywordMapper {
  toModel(keyword: KeywordEntity) {
    return (
      keyword &&
      new KeywordModel({
        ...keyword,
        updatedAt: convertToISODateString(keyword.updatedAt),
        createdAt: convertToISODateString(keyword.createdAt)
      })
    );
  }
  toModels(keywords: KeywordEntity[]) {
    return keywords?.length > 0
      ? keywords.map(this.toModel).filter(Boolean)
      : [];
  }
}
