export interface PagarmeOrderCard {
  brand: string;
  lastFourNumber: string;
  expiryMonth: string;
  expiryYear: string;
}

export interface PagarmeOrderBoleto {
  line: string;
  pdf: string;
  barcode: string;
}

export interface PagarmeOrderPIX {
  copyAndPaste: string;
  qrCodeURL: string;
}

export interface PagarmeOrder {
  id: string;
  code: string;
  error?: string;
  paymentMethod: 'pix';
  status: 'pending' | 'paid' | 'canceled' | 'failed';
  boleto?: PagarmeOrderBoleto;
  card?: PagarmeOrderCard;
  pix?: PagarmeOrderPIX;
}
