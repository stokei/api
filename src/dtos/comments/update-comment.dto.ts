export interface UpdateCommentDataDTO {
  name?: string;
}

export interface UpdateCommentWhereDTO {
  commentId: string;
}

export interface UpdateCommentDTO {
  data: UpdateCommentDataDTO;
  where: UpdateCommentWhereDTO;
}
