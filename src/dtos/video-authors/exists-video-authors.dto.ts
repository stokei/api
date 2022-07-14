export interface ExistsVideoAuthorsWhereDTO {
  video?: string;
  author?: string;
}

export interface ExistsVideoAuthorsDTO {
  where: ExistsVideoAuthorsWhereDTO;
}
