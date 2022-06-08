export interface UpdateAnswerDataDTO {
  name?: string;
}

export interface UpdateAnswerWhereDTO {
  answerId: string;
}

export interface UpdateAnswerDTO {
  data: UpdateAnswerDataDTO;
  where: UpdateAnswerWhereDTO;
}
