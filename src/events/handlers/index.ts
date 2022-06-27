import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { AddressEventsHandlers } from './addresses';
import { CardEventsHandlers } from './cards';
import { CartEventsHandlers } from './carts';
import { CartsItemEventsHandlers } from './carts-items';
import { ClassroomEventsHandlers } from './classrooms';
import { ClassroomsInstructorEventsHandlers } from './classrooms-instructors';
import { ClassroomsModuleEventsHandlers } from './classrooms-modules';
import { ClassroomsStudentEventsHandlers } from './classrooms-students';
import { ColorEventsHandlers } from './colors';
import { CourseEventsHandlers } from './courses';
import { CoursesInstructorEventsHandlers } from './courses-instructors';
import { CoursesStudentEventsHandlers } from './courses-students';
import { CurrencyEventsHandlers } from './currencies';
import { DomainEventsHandlers } from './domains';
import { ImageEventsHandlers } from './images';
import { LanguageEventsHandlers } from './languages';
import { ModuleEventsHandlers } from './modules';
import { ModulesVideoEventsHandlers } from './modules-videos';
import { OrderEventsHandlers } from './orders';
import { OrdersItemEventsHandlers } from './orders-items';
import { PaymentEventsHandlers } from './payments';
import { PaymentsMethodEventsHandlers } from './payments-methods';
import { PhoneEventsHandlers } from './phones';
import { PlanEventsHandlers } from './plans';
import { PriceEventsHandlers } from './prices';
import { ProductEventsHandlers } from './products';
import { ProjectEventsHandlers } from './projects';
import { SiteEventsHandlers } from './sites';
import { SubscriptionEventsHandlers } from './subscriptions';
import { VideoEventsHandlers } from './videos';
import { VideosAuthorEventsHandlers } from './videos-authors';

export const EventsHandlers = [
  ...AccountEventsHandlers,
  ...AccessEventsHandlers,
  ...ProjectEventsHandlers,
  ...SiteEventsHandlers,
  ...DomainEventsHandlers,
  ...CurrencyEventsHandlers,
  ...LanguageEventsHandlers,
  ...ColorEventsHandlers,
  ...ProductEventsHandlers,
  ...PriceEventsHandlers,
  ...OrderEventsHandlers,
  ...OrdersItemEventsHandlers,
  ...PaymentEventsHandlers,
  ...PaymentsMethodEventsHandlers,
  ...CardEventsHandlers,
  ...CartEventsHandlers,
  ...CartsItemEventsHandlers,
  ...PlanEventsHandlers,
  ...ImageEventsHandlers,
  ...VideoEventsHandlers,
  ...VideosAuthorEventsHandlers,
  ...ModuleEventsHandlers,
  ...ModulesVideoEventsHandlers,
  ...CourseEventsHandlers,
  ...CoursesInstructorEventsHandlers,
  ...CoursesStudentEventsHandlers,
  ...ClassroomEventsHandlers,
  ...ClassroomsStudentEventsHandlers,
  ...SubscriptionEventsHandlers,
  ...ClassroomsInstructorEventsHandlers,
  ...ClassroomsModuleEventsHandlers,
  ...AddressEventsHandlers,
  ...PhoneEventsHandlers
];
