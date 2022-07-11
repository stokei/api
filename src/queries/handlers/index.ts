import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';
import { AddressQueriesHandlers } from './addresses';
import { CardQueriesHandlers } from './cards';
import { CartQueriesHandlers } from './carts';
import { CartsItemQueriesHandlers } from './carts-items';
import { ClassroomQueriesHandlers } from './classrooms';
import { ClassroomInstructorQueriesHandlers } from './classroom-instructors';
import { ClassroomModuleQueriesHandlers } from './classroom-module s';
import { ClassroomStudentQueriesHandlers } from './classroom-students';
import { ColorQueriesHandlers } from './colors';
import { CourseQueriesHandlers } from './courses';
import { CourseInstructorQueriesHandlers } from './course-instructors';
import { CourseStudentQueriesHandlers } from './course-students';
import { CurrencyQueriesHandlers } from './currencies';
import { DomainQueriesHandlers } from './domains';
import { ImageQueriesHandlers } from './images';
import { LanguageQueriesHandlers } from './languages';
import { ModuleQueriesHandlers } from './modules';
import { ModuleVideoQueriesHandlers } from './module-videos';
import { OrderQueriesHandlers } from './orders';
import { OrderItemQueriesHandlers } from './order-items';
import { PaymentQueriesHandlers } from './payments';
import { PaymentMethodQueriesHandlers } from './payment-methods';
import { PhoneQueriesHandlers } from './phones';
import { PlanQueriesHandlers } from './plans';
import { PriceQueriesHandlers } from './prices';
import { ProductQueriesHandlers } from './products';
import { ProjectQueriesHandlers } from './projects';
import { SubscriptionQueriesHandlers } from './subscriptions';
import { VideoQueriesHandlers } from './videos';
import { VideoAuthorQueriesHandlers } from './video-authors';

export const QueriesHandlers = [
  ...AccountQueriesHandlers,
  ...AccessQueriesHandlers,
  ...ProjectQueriesHandlers,
  ...DomainQueriesHandlers,
  ...CurrencyQueriesHandlers,
  ...LanguageQueriesHandlers,
  ...ColorQueriesHandlers,
  ...ProductQueriesHandlers,
  ...PriceQueriesHandlers,
  ...OrderQueriesHandlers,
  ...OrderItemQueriesHandlers,
  ...PaymentQueriesHandlers,
  ...PaymentMethodQueriesHandlers,
  ...CardQueriesHandlers,
  ...CartQueriesHandlers,
  ...CartsItemQueriesHandlers,
  ...PlanQueriesHandlers,
  ...ImageQueriesHandlers,
  ...VideoQueriesHandlers,
  ...VideoAuthorQueriesHandlers,
  ...ModuleQueriesHandlers,
  ...ModuleVideoQueriesHandlers,
  ...CourseQueriesHandlers,
  ...CourseInstructorQueriesHandlers,
  ...CourseStudentQueriesHandlers,
  ...ClassroomQueriesHandlers,
  ...ClassroomStudentQueriesHandlers,
  ...SubscriptionQueriesHandlers,
  ...ClassroomInstructorQueriesHandlers,
  ...ClassroomModuleQueriesHandlers,
  ...AddressQueriesHandlers,
  ...PhoneQueriesHandlers
];
