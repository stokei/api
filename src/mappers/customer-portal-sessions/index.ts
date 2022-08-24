import Stripe from 'stripe';

import { CustomerPortalSessionModel } from '@/models/customer-portal-session.model';

export class CustomerPortalSessionMapper {
  toModel(customerPortalSession: Stripe.BillingPortal.Session) {
    return (
      customerPortalSession &&
      new CustomerPortalSessionModel(customerPortalSession)
    );
  }
  toModels(customerPortalSessions: Stripe.BillingPortal.Session[]) {
    return customerPortalSessions?.length > 0
      ? customerPortalSessions.map(this.toModel).filter(Boolean)
      : [];
  }
}
