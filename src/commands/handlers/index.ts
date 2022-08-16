import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { AppCommandHandlers } from './apps';
import { ClassroomInstructorCommandHandlers } from './classroom-instructors';
import { ClassroomModuleCommandHandlers } from './classroom-modules';
import { ClassroomStudentCommandHandlers } from './classroom-students';
import { ClassroomCommandHandlers } from './classrooms';
import { ColorCommandHandlers } from './colors';
import { CourseInstructorCommandHandlers } from './course-instructors';
import { CourseStudentCommandHandlers } from './course-students';
import { CourseCommandHandlers } from './courses';
import { CurrencyCommandHandlers } from './currencies';
import { DomainCommandHandlers } from './domains';
import { ImageCommandHandlers } from './images';
import { LanguageCommandHandlers } from './languages';
import { ModuleCommandHandlers } from './modules';
import { PaymentMethodCommandHandlers } from './payment-methods';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { SubscriptionContractCommandHandlers } from './subscription-contracts';
import { VideoAuthorCommandHandlers } from './video-authors';
import { VideoCommandHandlers } from './videos';

export const CommandHandlers = [
  ...AccessCommandHandlers,
  ...AccountCommandHandlers,
  ...AppCommandHandlers,
  ...DomainCommandHandlers,
  ...CurrencyCommandHandlers,
  ...LanguageCommandHandlers,
  ...ColorCommandHandlers,
  ...ProductCommandHandlers,
  ...PriceCommandHandlers,
  ...PaymentMethodCommandHandlers,
  ...PlanCommandHandlers,
  ...ImageCommandHandlers,
  ...VideoCommandHandlers,
  ...VideoAuthorCommandHandlers,
  ...ModuleCommandHandlers,
  ...CourseCommandHandlers,
  ...CourseInstructorCommandHandlers,
  ...CourseStudentCommandHandlers,
  ...ClassroomCommandHandlers,
  ...ClassroomStudentCommandHandlers,
  ...SubscriptionContractCommandHandlers,
  ...ClassroomInstructorCommandHandlers,
  ...ClassroomModuleCommandHandlers,
  ...AddressCommandHandlers,
  ...PhoneCommandHandlers
];
