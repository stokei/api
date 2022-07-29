import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';
import { AddressQueriesHandlers } from './addresses';
import { AppQueriesHandlers } from './apps';
import { CartItemQueriesHandlers } from './cart-items';
import { CartQueriesHandlers } from './carts';
import { ClassroomInstructorQueriesHandlers } from './classroom-instructors';
import { ClassroomModuleQueriesHandlers } from './classroom-modules';
import { ClassroomStudentQueriesHandlers } from './classroom-students';
import { ClassroomQueriesHandlers } from './classrooms';
import { ColorQueriesHandlers } from './colors';
import { CourseInstructorQueriesHandlers } from './course-instructors';
import { CourseStudentQueriesHandlers } from './course-students';
import { CourseQueriesHandlers } from './courses';
import { CurrencyQueriesHandlers } from './currencies';
import { DomainQueriesHandlers } from './domains';
import { ImageQueriesHandlers } from './images';
import { LanguageQueriesHandlers } from './languages';
import { ModuleQueriesHandlers } from './modules';
import { OrderItemQueriesHandlers } from './order-items';
import { OrderQueriesHandlers } from './orders';
import { PaymentMethodQueriesHandlers } from './payment-methods';
import { PaymentQueriesHandlers } from './payments';
import { PhoneQueriesHandlers } from './phones';
import { PlanQueriesHandlers } from './plans';
import { PriceQueriesHandlers } from './prices';
import { ProductQueriesHandlers } from './products';
import { SubscriptionContractQueriesHandlers } from './subscription-contracts';
import { VideoAuthorQueriesHandlers } from './video-authors';
import { VideoQueriesHandlers } from './videos';

export const QueriesHandlers = [
  ...AccountQueriesHandlers,
  ...AccessQueriesHandlers,
  ...AppQueriesHandlers,
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
  ...CartQueriesHandlers,
  ...CartItemQueriesHandlers,
  ...PlanQueriesHandlers,
  ...ImageQueriesHandlers,
  ...VideoQueriesHandlers,
  ...VideoAuthorQueriesHandlers,
  ...ModuleQueriesHandlers,
  ...CourseQueriesHandlers,
  ...CourseInstructorQueriesHandlers,
  ...CourseStudentQueriesHandlers,
  ...ClassroomQueriesHandlers,
  ...ClassroomStudentQueriesHandlers,
  ...SubscriptionContractQueriesHandlers,
  ...ClassroomInstructorQueriesHandlers,
  ...ClassroomModuleQueriesHandlers,
  ...AddressQueriesHandlers,
  ...PhoneQueriesHandlers
];
