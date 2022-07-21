export interface CreateDomainDTO {
  parent: string;
  fulldomain: string;
  default?: boolean;
  language: string;
  createdBy: string;
}
