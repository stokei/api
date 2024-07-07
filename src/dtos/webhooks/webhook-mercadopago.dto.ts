export interface WebhookMercadopagoDTO {
  body: any;
  queryParams?: {
    appId?: string;
    paymentId?: string;
  };
}
