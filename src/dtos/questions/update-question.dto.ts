export interface UpdateQuestionDataDTO {
  name?: string;
}

export interface UpdateQuestionWhereDTO {
  questionId: string;
}

export interface UpdateQuestionDTO {
  data: UpdateQuestionDataDTO;
  where: UpdateQuestionWhereDTO;
}
