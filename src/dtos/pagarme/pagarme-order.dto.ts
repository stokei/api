export interface PagarmeOrderPIX {
  qrCodeURL: string;
}

export interface PagarmeOrder {
  id: string;
  code: string;
  paymentMethod: 'pix';
  status: 'pending' | 'paid' | 'canceled' | 'failed';
  pix?: PagarmeOrderPIX;
}
