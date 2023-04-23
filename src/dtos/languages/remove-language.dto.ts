export interface RemoveLanguageWhereDTO {
  removedBy: string;
  language: string;
}

export interface RemoveLanguageDTO {
  where: RemoveLanguageWhereDTO;
}
