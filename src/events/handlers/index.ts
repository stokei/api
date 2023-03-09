import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { AppEventsHandlers } from './apps';
import { CatalogItemEventsHandlers } from './catalog-items';
import { CatalogEventsHandlers } from './catalogs';
import { ColorEventsHandlers } from './colors';
import { CourseInstructorEventsHandlers } from './course-instructors';
import { CourseStudentEventsHandlers } from './course-students';
import { CourseEventsHandlers } from './courses';
import { CurrencyEventsHandlers } from './currencies';
import { DomainEventsHandlers } from './domains';
import { FeatureEventsHandlers } from './features';
import { FileEventsHandlers } from './files';
import { HeroEventsHandlers } from './heros';
import { ImageEventsHandlers } from './images';
import { InvoiceEventsHandlers } from './invoices';
import { LanguageEventsHandlers } from './languages';
import { ModuleEventsHandlers } from './modules';
import { PaymentMethodEventsHandlers } from './payment-methods';
import { PhoneEventsHandlers } from './phones';
import { PlanEventsHandlers } from './plans';
import { PriceTierEventsHandlers } from './price-tiers';
import { PriceEventsHandlers } from './prices';
import { ProductEventsHandlers } from './products';
import { RecurringEventsHandlers } from './recurrings';
import { RoleEventsHandlers } from './roles';
import { SubscriptionContractItemEventsHandlers } from './subscription-contract-items';
import { SubscriptionContractEventsHandlers } from './subscription-contracts';
import { UsageRecordEventsHandlers } from './usage-records';
import { VideoAuthorEventsHandlers } from './video-authors';
import { VideoEventsHandlers } from './videos';

export const EventsHandlers = [
  ...AccountEventsHandlers,
  ...AccessEventsHandlers,
  ...AppEventsHandlers,
  ...DomainEventsHandlers,
  ...CurrencyEventsHandlers,
  ...LanguageEventsHandlers,
  ...ColorEventsHandlers,
  ...ProductEventsHandlers,
  ...PriceEventsHandlers,
  ...PaymentMethodEventsHandlers,
  ...FileEventsHandlers,
  ...PlanEventsHandlers,
  ...InvoiceEventsHandlers,
  ...ImageEventsHandlers,
  ...VideoEventsHandlers,
  ...VideoAuthorEventsHandlers,
  ...ModuleEventsHandlers,
  ...CourseEventsHandlers,
  ...CourseInstructorEventsHandlers,
  ...CourseStudentEventsHandlers,
  ...SubscriptionContractEventsHandlers,
  ...AddressEventsHandlers,
  ...PhoneEventsHandlers,
  ...RecurringEventsHandlers,
  ...FeatureEventsHandlers,
  ...PriceTierEventsHandlers,
  ...SubscriptionContractItemEventsHandlers,
  ...UsageRecordEventsHandlers,
  ...CatalogEventsHandlers,
  ...CatalogItemEventsHandlers,
  ...RoleEventsHandlers,
  ...HeroEventsHandlers
];
