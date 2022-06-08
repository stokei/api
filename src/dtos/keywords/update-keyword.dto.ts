export interface UpdateKeywordDataDTO {
  name?: string;
}

export interface UpdateKeywordWhereDTO {
  keywordId: string;
}

export interface UpdateKeywordDTO {
  data: UpdateKeywordDataDTO;
  where: UpdateKeywordWhereDTO;
}
