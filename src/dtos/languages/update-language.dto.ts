export interface UpdateLanguageDataDTO {
  name?: string;
}

export interface UpdateLanguageWhereDTO {
  languageId: string;
}

export interface UpdateLanguageDTO {
  data: UpdateLanguageDataDTO;
  where: UpdateLanguageWhereDTO;
}
