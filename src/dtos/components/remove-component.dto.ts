export interface RemoveComponentWhereDTO {
  removedBy: string;
  app: string;
  component: string;
}

export interface RemoveComponentDTO {
  where: RemoveComponentWhereDTO;
}
