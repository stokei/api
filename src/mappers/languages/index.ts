import { convertToISODateString } from '@stokei/nestjs';
import { LanguageEntity } from '@/entities';
import { LanguageModel } from '@/models/language.model';

export class LanguageMapper {
  toModel(language: LanguageEntity) {
    return (
      language &&
      new LanguageModel({
        ...language,
        updatedAt: convertToISODateString(language.updatedAt),
        createdAt: convertToISODateString(language.createdAt)
      })
    );
  }
  toModels(languages: LanguageEntity[]) {
    return languages?.length > 0
      ? languages.map(this.toModel).filter(Boolean)
      : [];
  }
}
