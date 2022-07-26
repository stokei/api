export interface RemoveLanguageWhereDTO {
  removedBy: string;
  app: string;
  languageId: string;
}

export interface RemoveLanguageDTO {
  where: RemoveLanguageWhereDTO;
}
