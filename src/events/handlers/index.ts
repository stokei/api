import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { CartEventsHandlers } from './carts';
import { CartItemEventsHandlers } from './cart-items';
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
import { ModuleVideoEventsHandlers } from './module-videos';
import { ModuleEventsHandlers } from './modules';
import { OrderItemEventsHandlers } from './order-items';
import { OrderEventsHandlers } from './orders';
import { PaymentMethodEventsHandlers } from './payment-methods';
import { PaymentEventsHandlers } from './payments';
import { PhoneEventsHandlers } from './phones';
import { PlanEventsHandlers } from './plans';
import { PriceEventsHandlers } from './prices';
import { ProductEventsHandlers } from './products';
import { ProjectEventsHandlers } from './projects';
import { SubscriptionEventsHandlers } from './subscriptions';
import { VideoAuthorEventsHandlers } from './video-authors';
import { VideoEventsHandlers } from './videos';

export const EventsHandlers = [
  ...AccountEventsHandlers,
  ...AccessEventsHandlers,
  ...ProjectEventsHandlers,
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
  ...ModuleVideoEventsHandlers,
  ...CourseEventsHandlers,
  ...CourseInstructorEventsHandlers,
  ...CourseStudentEventsHandlers,
  ...ClassroomEventsHandlers,
  ...ClassroomStudentEventsHandlers,
  ...SubscriptionEventsHandlers,
  ...ClassroomInstructorEventsHandlers,
  ...ClassroomModuleEventsHandlers,
  ...AddressEventsHandlers,
  ...PhoneEventsHandlers
];
