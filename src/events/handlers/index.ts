import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { AppEventsHandlers } from './apps';
import { ColorEventsHandlers } from './colors';
import { CourseInstructorEventsHandlers } from './course-instructors';
import { CourseStudentEventsHandlers } from './course-students';
import { CourseEventsHandlers } from './courses';
import { CurrencyEventsHandlers } from './currencies';
import { DomainEventsHandlers } from './domains';
import { FileEventsHandlers } from './files';
import { ImageEventsHandlers } from './images';
import { InvoiceEventsHandlers } from './invoices';
import { LanguageEventsHandlers } from './languages';
import { ModuleEventsHandlers } from './modules';
import { PaymentMethodEventsHandlers } from './payment-methods';
import { PhoneEventsHandlers } from './phones';
import { PlanEventsHandlers } from './plans';
import { PriceEventsHandlers } from './prices';
import { ProductEventsHandlers } from './products';
import { SubscriptionContractEventsHandlers } from './subscription-contracts';
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
  ...PhoneEventsHandlers
];
