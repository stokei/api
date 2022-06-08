export interface UpdateProjectsMemberDataDTO {
  name?: string;
}

export interface UpdateProjectsMemberWhereDTO {
  projectsMemberId: string;
}

export interface UpdateProjectsMemberDTO {
  data: UpdateProjectsMemberDataDTO;
  where: UpdateProjectsMemberWhereDTO;
}
