import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { CardCommandHandlers } from './cards';
import { CartCommandHandlers } from './carts';
import { CartsItemCommandHandlers } from './carts-items';
import { ClassroomCommandHandlers } from './classrooms';
import { ClassroomInstructorCommandHandlers } from './classroom-instructors';
import { ClassroomModuleCommandHandlers } from './classroom-module s';
import { ClassroomStudentCommandHandlers } from './classroom-students';
import { ColorCommandHandlers } from './colors';
import { CourseCommandHandlers } from './courses';
import { CourseInstructorCommandHandlers } from './course-instructors';
import { CourseStudentCommandHandlers } from './course-students';
import { CurrencyCommandHandlers } from './currencies';
import { DomainCommandHandlers } from './domains';
import { ImageCommandHandlers } from './images';
import { LanguageCommandHandlers } from './languages';
import { ModuleCommandHandlers } from './modules';
import { ModuleVideoCommandHandlers } from './module-videos';
import { OrderCommandHandlers } from './orders';
import { OrderItemCommandHandlers } from './order-items';
import { PaymentCommandHandlers } from './payments';
import { PaymentMethodCommandHandlers } from './payment-methods';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { ProjectCommandHandlers } from './projects';
import { SubscriptionCommandHandlers } from './subscriptions';
import { VideoCommandHandlers } from './videos';
import { VideosAuthorCommandHandlers } from './videos-authors';

export const CommandHandlers = [
  ...AccessCommandHandlers,
  ...AccountCommandHandlers,
  ...ProjectCommandHandlers,
  ...DomainCommandHandlers,
  ...CurrencyCommandHandlers,
  ...LanguageCommandHandlers,
  ...ColorCommandHandlers,
  ...ProductCommandHandlers,
  ...PriceCommandHandlers,
  ...OrderCommandHandlers,
  ...OrderItemCommandHandlers,
  ...PaymentCommandHandlers,
  ...PaymentMethodCommandHandlers,
  ...CardCommandHandlers,
  ...CartCommandHandlers,
  ...CartsItemCommandHandlers,
  ...PlanCommandHandlers,
  ...ImageCommandHandlers,
  ...VideoCommandHandlers,
  ...VideosAuthorCommandHandlers,
  ...ModuleCommandHandlers,
  ...ModuleVideoCommandHandlers,
  ...CourseCommandHandlers,
  ...CourseInstructorCommandHandlers,
  ...CourseStudentCommandHandlers,
  ...ClassroomCommandHandlers,
  ...ClassroomStudentCommandHandlers,
  ...SubscriptionCommandHandlers,
  ...ClassroomInstructorCommandHandlers,
  ...ClassroomModuleCommandHandlers,
  ...AddressCommandHandlers,
  ...PhoneCommandHandlers
];
