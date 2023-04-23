export interface RemoveHeroWhereDTO {
  removedBy: string;
  hero: string;
}

export interface RemoveHeroDTO {
  where: RemoveHeroWhereDTO;
}
