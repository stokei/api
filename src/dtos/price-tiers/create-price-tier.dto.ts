export class CreatePriceTierDTO {
  app: string;
  parent: string;
  amount: number;
  upTo?: number;
  infinite: boolean;
  createdBy: string;
}
