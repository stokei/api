import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { AppEventsHandlers } from './apps';
import { ClassroomInstructorEventsHandlers } from './classroom-instructors';
import { ClassroomModuleEventsHandlers } from './classroom-modules';
import { ClassroomStudentEventsHandlers } from './classroom-students';
import { ClassroomEventsHandlers } from './classrooms';
import { ColorEventsHandlers } from './colors';
import { CourseInstructorEventsHandlers } from './course-instructors';
import { CourseStudentEventsHandlers } from './course-students';
import { CourseEventsHandlers } from './courses';
import { CurrencyEventsHandlers } from './currencies';
import { DomainEventsHandlers } from './domains';
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
  ...PlanEventsHandlers,
  ...InvoiceEventsHandlers,
  ...ImageEventsHandlers,
  ...VideoEventsHandlers,
  ...VideoAuthorEventsHandlers,
  ...ModuleEventsHandlers,
  ...CourseEventsHandlers,
  ...CourseInstructorEventsHandlers,
  ...CourseStudentEventsHandlers,
  ...ClassroomEventsHandlers,
  ...ClassroomStudentEventsHandlers,
  ...SubscriptionContractEventsHandlers,
  ...ClassroomInstructorEventsHandlers,
  ...ClassroomModuleEventsHandlers,
  ...AddressEventsHandlers,
  ...PhoneEventsHandlers
];
