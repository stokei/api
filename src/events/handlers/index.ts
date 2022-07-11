import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { CardEventsHandlers } from './cards';
import { CartEventsHandlers } from './carts';
import { CartsItemEventsHandlers } from './carts-items';
import { ClassroomEventsHandlers } from './classrooms';
import { ClassroomInstructorEventsHandlers } from './classroom-instructors';
import { ClassroomModuleEventsHandlers } from './classroom-module s';
import { ClassroomStudentEventsHandlers } from './classroom-students';
import { ColorEventsHandlers } from './colors';
import { CourseEventsHandlers } from './courses';
import { CourseInstructorEventsHandlers } from './course-instructors';
import { CourseStudentEventsHandlers } from './course-students';
import { CurrencyEventsHandlers } from './currencies';
import { DomainEventsHandlers } from './domains';
import { ImageEventsHandlers } from './images';
import { LanguageEventsHandlers } from './languages';
import { ModuleEventsHandlers } from './modules';
import { ModuleVideoEventsHandlers } from './module-videos';
import { OrderEventsHandlers } from './orders';
import { OrderItemEventsHandlers } from './order-items';
import { PaymentEventsHandlers } from './payments';
import { PaymentMethodEventsHandlers } from './payment-methods';
import { PhoneEventsHandlers } from './phones';
import { PlanEventsHandlers } from './plans';
import { PriceEventsHandlers } from './prices';
import { ProductEventsHandlers } from './products';
import { ProjectEventsHandlers } from './projects';
import { SubscriptionEventsHandlers } from './subscriptions';
import { VideoEventsHandlers } from './videos';
import { VideoAuthorEventsHandlers } from './video-authors';

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
  ...CardEventsHandlers,
  ...CartEventsHandlers,
  ...CartsItemEventsHandlers,
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
