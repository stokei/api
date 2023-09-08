import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { getStokeiFeeAmount, getTotalFeeAmount } from '.';

describe('FeeAmount', () => {
  describe('GetTotalFeeAmount', () => {
    describe('Stripe', () => {
      it('should return correct fee amount to CARD payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.CARD
        });
        const response = 900 + 39; // R$ 9,00 + R$ 0,39
        expect(request).toBe(response);
      });
      it('should return correct fee amount to BOLETO payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        const response = 500 + 345; // R$ 5,00 + R$ 3,45
        expect(request).toBe(response);
      });
      it('should return undefined to PIX payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.PIX
        });
        expect(request).toBeUndefined();
      });
    });
    describe('Pagarme', () => {
      it('should return undefined to CARD payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.CARD
        });
        expect(request).toBeUndefined();
      });
      it('should return undefined to BOLETO payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        expect(request).toBeUndefined();
      });
      it('should return correct fee amount to PIX payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.PIX
        });
        const response = 400 + 200; // R$ 4,00 + R$ 2,00
        expect(request).toBe(response);
      });
    });
  });
  describe('GetStokeiFeeAmount', () => {
    describe('Stripe', () => {
      it('should return correct fee amount to CARD payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.CARD
        });
        const response = 500; // R$ 5,00
        expect(request).toBe(response);
      });
      it('should return correct fee amount to BOLETO payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        const response = 500; // R$ 5,00
        expect(request).toBe(response);
      });
      it('should return undefined to PIX payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.PIX
        });
        expect(request).toBeUndefined();
      });
    });
    describe('Pagarme', () => {
      it('should return undefined to CARD payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.CARD
        });
        expect(request).toBeUndefined();
      });
      it('should return undefined to BOLETO payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        expect(request).toBeUndefined();
      });
      it('should return correct fee amount to PIX payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.PIX
        });
        const response = 400 + 200; // R$ 4,00 + R$ 2,00
        expect(request).toBe(response);
      });
    });
  });
});
