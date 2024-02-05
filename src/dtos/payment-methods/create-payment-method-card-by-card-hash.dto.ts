export interface CreatePaymentMethodCardByCardHashDTO {
  parent: string;
  cardHash: string;
  address: string;
  app: string;
  createdBy: string;
}
