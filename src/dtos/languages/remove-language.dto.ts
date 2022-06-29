export interface RemoveLanguageWhereDTO {
  removedBy: string;
  languageId: string;
}

export interface RemoveLanguageDTO {
  where: RemoveLanguageWhereDTO;
}
