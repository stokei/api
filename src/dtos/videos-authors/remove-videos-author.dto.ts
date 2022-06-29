export interface RemoveVideosAuthorWhereDTO {
  removedBy: string;
  videosAuthorId: string;
}

export interface RemoveVideosAuthorDTO {
  where: RemoveVideosAuthorWhereDTO;
}
