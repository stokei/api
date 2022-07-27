export interface RemoveLanguageWhereDTO {
  removedBy: string;
  app: string;
  language: string;
}

export interface RemoveLanguageDTO {
  where: RemoveLanguageWhereDTO;
}
