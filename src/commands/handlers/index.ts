import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { CartCommandHandlers } from './carts';
import { CartItemCommandHandlers } from './cart-items';
import { ClassroomCommandHandlers } from './classrooms';
import { ClassroomInstructorCommandHandlers } from './classroom-instructors';
import { ClassroomModuleCommandHandlers } from './classroom-modules';
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
import { VideoAuthorCommandHandlers } from './video-authors';

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
  ...CartCommandHandlers,
  ...CartItemCommandHandlers,
  ...PlanCommandHandlers,
  ...ImageCommandHandlers,
  ...VideoCommandHandlers,
  ...VideoAuthorCommandHandlers,
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
