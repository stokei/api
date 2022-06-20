import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';
import { AddressQueriesHandlers } from './addresses';
import { CardQueriesHandlers } from './cards';
import { CartQueriesHandlers } from './carts';
import { CartsItemQueriesHandlers } from './carts-items';
import { ClassroomQueriesHandlers } from './classrooms';
import { ClassroomsEnrollmentQueriesHandlers } from './classrooms-enrollments';
import { ClassroomsInstructorQueriesHandlers } from './classrooms-instructors';
import { ClassroomsModuleQueriesHandlers } from './classrooms-modules';
import { ClassroomsStudentQueriesHandlers } from './classrooms-students';
import { ColorQueriesHandlers } from './colors';
import { CourseQueriesHandlers } from './courses';
import { CoursesInstructorQueriesHandlers } from './courses-instructors';
import { CoursesStudentQueriesHandlers } from './courses-students';
import { CurrencyQueriesHandlers } from './currencies';
import { DomainQueriesHandlers } from './domains';
import { ImageQueriesHandlers } from './images';
import { LanguageQueriesHandlers } from './languages';
import { ModuleQueriesHandlers } from './modules';
import { ModulesVideoQueriesHandlers } from './modules-videos';
import { OrderQueriesHandlers } from './orders';
import { OrdersItemQueriesHandlers } from './orders-items';
import { PaymentQueriesHandlers } from './payments';
import { PaymentsMethodQueriesHandlers } from './payments-methods';
import { PhoneQueriesHandlers } from './phones';
import { PlanQueriesHandlers } from './plans';
import { PriceQueriesHandlers } from './prices';
import { ProductQueriesHandlers } from './products';
import { ProjectQueriesHandlers } from './projects';
import { ProjectsMemberQueriesHandlers } from './projects-members';
import { SiteQueriesHandlers } from './sites';
import { VideoQueriesHandlers } from './videos';
import { VideosAuthorQueriesHandlers } from './videos-authors';

export const QueriesHandlers = [
  ...AccountQueriesHandlers,
  ...AccessQueriesHandlers,
  ...ProjectQueriesHandlers,
  ...ProjectsMemberQueriesHandlers,
  ...SiteQueriesHandlers,
  ...DomainQueriesHandlers,
  ...CurrencyQueriesHandlers,
  ...LanguageQueriesHandlers,
  ...ColorQueriesHandlers,
  ...ProductQueriesHandlers,
  ...PriceQueriesHandlers,
  ...OrderQueriesHandlers,
  ...OrdersItemQueriesHandlers,
  ...PaymentQueriesHandlers,
  ...PaymentsMethodQueriesHandlers,
  ...CardQueriesHandlers,
  ...CartQueriesHandlers,
  ...CartsItemQueriesHandlers,
  ...PlanQueriesHandlers,
  ...ImageQueriesHandlers,
  ...VideoQueriesHandlers,
  ...VideosAuthorQueriesHandlers,
  ...ModuleQueriesHandlers,
  ...ModulesVideoQueriesHandlers,
  ...CourseQueriesHandlers,
  ...CoursesInstructorQueriesHandlers,
  ...CoursesStudentQueriesHandlers,
  ...ClassroomQueriesHandlers,
  ...ClassroomsStudentQueriesHandlers,
  ...ClassroomsEnrollmentQueriesHandlers,
  ...ClassroomsInstructorQueriesHandlers,
  ...ClassroomsModuleQueriesHandlers,
  ...AddressQueriesHandlers,
  ...PhoneQueriesHandlers
];
