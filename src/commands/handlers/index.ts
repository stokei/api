import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { CardCommandHandlers } from './cards';
import { CartCommandHandlers } from './carts';
import { CartsItemCommandHandlers } from './carts-items';
import { ClassroomCommandHandlers } from './classrooms';
import { ClassroomsEnrollmentCommandHandlers } from './classrooms-enrollments';
import { ClassroomsInstructorCommandHandlers } from './classrooms-instructors';
import { ClassroomsModuleCommandHandlers } from './classrooms-modules';
import { ClassroomsStudentCommandHandlers } from './classrooms-students';
import { ColorCommandHandlers } from './colors';
import { CourseCommandHandlers } from './courses';
import { CoursesInstructorCommandHandlers } from './courses-instructors';
import { CoursesStudentCommandHandlers } from './courses-students';
import { CurrencyCommandHandlers } from './currencies';
import { DomainCommandHandlers } from './domains';
import { ImageCommandHandlers } from './images';
import { LanguageCommandHandlers } from './languages';
import { ModuleCommandHandlers } from './modules';
import { ModulesVideoCommandHandlers } from './modules-videos';
import { OrderCommandHandlers } from './orders';
import { OrdersItemCommandHandlers } from './orders-items';
import { PaymentCommandHandlers } from './payments';
import { PaymentsMethodCommandHandlers } from './payments-methods';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { ProjectCommandHandlers } from './projects';
import { ProjectsMemberCommandHandlers } from './projects-members';
import { SiteCommandHandlers } from './sites';
import { VideoCommandHandlers } from './videos';
import { VideosAuthorCommandHandlers } from './videos-authors';

export const CommandHandlers = [
  ...AccessCommandHandlers,
  ...AccountCommandHandlers,
  ...ProjectCommandHandlers,
  ...ProjectsMemberCommandHandlers,
  ...SiteCommandHandlers,
  ...DomainCommandHandlers,
  ...CurrencyCommandHandlers,
  ...LanguageCommandHandlers,
  ...ColorCommandHandlers,
  ...ProductCommandHandlers,
  ...PriceCommandHandlers,
  ...OrderCommandHandlers,
  ...OrdersItemCommandHandlers,
  ...PaymentCommandHandlers,
  ...PaymentsMethodCommandHandlers,
  ...CardCommandHandlers,
  ...CartCommandHandlers,
  ...CartsItemCommandHandlers,
  ...PlanCommandHandlers,
  ...ImageCommandHandlers,
  ...VideoCommandHandlers,
  ...VideosAuthorCommandHandlers,
  ...ModuleCommandHandlers,
  ...ModulesVideoCommandHandlers,
  ...CourseCommandHandlers,
  ...CoursesInstructorCommandHandlers,
  ...CoursesStudentCommandHandlers,
  ...ClassroomCommandHandlers,
  ...ClassroomsStudentCommandHandlers,
  ...ClassroomsEnrollmentCommandHandlers,
  ...ClassroomsInstructorCommandHandlers,
  ...ClassroomsModuleCommandHandlers,
  ...AddressCommandHandlers,
  ...PhoneCommandHandlers
];
