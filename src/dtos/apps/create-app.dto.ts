export interface CreateAppDTO {
  id?: string;
  parent: string;
  slug?: string;
  name: string;
  email: string;
  language: string;
  currency: string;
  createdBy: string;
}
