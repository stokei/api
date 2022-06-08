export interface UpdateRatingDataDTO {
  name?: string;
}

export interface UpdateRatingWhereDTO {
  ratingId: string;
}

export interface UpdateRatingDTO {
  data: UpdateRatingDataDTO;
  where: UpdateRatingWhereDTO;
}
