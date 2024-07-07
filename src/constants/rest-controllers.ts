export const REST_CONTROLLERS_URL_NAMES = {
  VERSIONS: 'versions',
  COMPONENTS: 'components',
  HEALTH_CHECKS: {
    BASE: 'status',
    STATUS: 'status'
  },
  PAYMENT_GATEWAYS: {
    BASE: 'payment-gateways',
    MERCADOPAGO: {
      COMPLETE_ACCOUNT: 'payment-gateways/mercadopago/complete-account'
    }
  },
  UPLOADS: {
    BASE: 'uploads',
    FILES: 'uploads/files',
    IMAGES: 'uploads/images',
    VIDEOS: 'uploads/videos'
  },
  WEBHOOKS: {
    BASE: 'webhooks',
    STRIPE: 'webhooks/stripe',
    PAGSEGURO: 'webhooks/pagseguro',
    MERCADOPAGO: 'webhooks/mercadopago',
    PAGARME: 'webhooks/pagarme',
    VIDEOS: 'webhooks/videos'
  }
};
