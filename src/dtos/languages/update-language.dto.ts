export interface UpdateLanguageDataDTO {
  updatedBy: string;
  name?: string;
  icon?: string;
}

export interface UpdateLanguageWhereDTO {
  language: string;
}

export interface UpdateLanguageDTO {
  data: UpdateLanguageDataDTO;
  where: UpdateLanguageWhereDTO;
}
