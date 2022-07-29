import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { AppEventsHandlers } from './apps';
import { CartItemEventsHandlers } from './cart-items';
import { CartEventsHandlers } from './carts';
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
import { LanguageEventsHandlers } from './languages';
import { ModuleEventsHandlers } from './modules';
import { OrderItemEventsHandlers } from './order-items';
import { OrderEventsHandlers } from './orders';
import { PaymentMethodEventsHandlers } from './payment-methods';
import { PaymentEventsHandlers } from './payments';
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
  ...OrderEventsHandlers,
  ...OrderItemEventsHandlers,
  ...PaymentEventsHandlers,
  ...PaymentMethodEventsHandlers,
  ...CartEventsHandlers,
  ...CartItemEventsHandlers,
  ...PlanEventsHandlers,
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
