import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { getStokeiFeeAmount, getTotalFeeAmount } from '.';

describe('FeeAmount', () => {
  describe('GetTotalFeeAmount', () => {
    describe('Stripe', () => {
      it('should return undefined to CARD payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.CARD
        });
        expect(request).toBeUndefined();
      });
      it('should return undefined to BOLETO payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        expect(request).toBeUndefined();
      });
      it('should return undefined to PIX payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.PIX
        });
        expect(request).toBeUndefined();
      });
      it('should return correct fee amount to STRIPE payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.STRIPE
        });
        const response = 900 + 39; // R$ 9,00 + R$ 0,39
        expect(request).toBe(response);
      });
    });
    describe('Pagarme', () => {
      it('should return correct fee amount to CARD payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.CARD
        });
        const response = 1100; // R$ 9,00 + R$ 2,00 = R$ 11,00
        expect(request).toBe(response);
      });
      it('should return correct fee amount to BOLETO payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        const response = 700; // R$ 5,00 + R$ 2,00 = R$ 7,00
        expect(request).toBe(response);
      });
      it('should return correct fee amount to PIX payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.PIX
        });
        const response = 600; // R$ 4,00 + R$ 2,00 = R$ 6,00
        expect(request).toBe(response);
      });
      it('should return undefined to STRIPE payment method', () => {
        const request = getTotalFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.STRIPE
        });
        expect(request).toBeUndefined();
      });
    });
  });
  describe('GetStokeiFeeAmount', () => {
    describe('Stripe', () => {
      it('should return undefined to CARD payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.CARD
        });
        expect(request).toBeUndefined();
      });
      it('should return undefined to BOLETO payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        expect(request).toBeUndefined();
      });
      it('should return undefined to PIX payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.PIX
        });
        expect(request).toBeUndefined();
      });
      it('should return correct fee amount to STRIPE payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.STRIPE,
          paymentMethodType: PaymentMethodType.STRIPE
        });
        const response = 501; // R$ 5,01
        expect(request).toBe(response);
      });
    });
    describe('Pagarme', () => {
      it('should return correct fee amount to CARD payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.CARD
        });
        const response = 1100; // R$ 9,00 + R$ 2,00 = R$ 11,00
        expect(request).toBe(response);
      });
      it('should return correct fee amount to BOLETO payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.BOLETO
        });
        const response = 700; // R$ 5,00 + R$ 2,00 = R$ 7,00
        expect(request).toBe(response);
      });
      it('should return correct fee amount to PIX payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.PIX
        });
        const response = 600; // R$ 4,00 + R$ 2,00 = R$ 6,00
        expect(request).toBe(response);
      });
      it('should return undefined to STRIPE payment method', () => {
        const request = getStokeiFeeAmount({
          amount: 10000,
          paymentGatewayType: PaymentGatewayType.PAGARME,
          paymentMethodType: PaymentMethodType.STRIPE
        });
        expect(request).toBeUndefined();
      });
    });
  });
});
