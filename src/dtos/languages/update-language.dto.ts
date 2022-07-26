export interface UpdateLanguageDataDTO {
  updatedBy: string;
  app: string;
  name?: string;
  icon?: string;
}

export interface UpdateLanguageWhereDTO {
  languageId: string;
}

export interface UpdateLanguageDTO {
  data: UpdateLanguageDataDTO;
  where: UpdateLanguageWhereDTO;
}
