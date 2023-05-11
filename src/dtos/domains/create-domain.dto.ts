export interface CreateDomainDTO {
  parent: string;
  name: string;
  default?: boolean;
  app: string;
  createdBy: string;
}
