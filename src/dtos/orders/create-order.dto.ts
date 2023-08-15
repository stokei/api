export interface CreateOrderDTO {
  name: string;
  description?: string;
  parent: string;
  app: string;
  createdBy: string;
}
