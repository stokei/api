import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { CartItemCommandHandlers } from './cart-items';
import { CartCommandHandlers } from './carts';
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
import { ModuleVideoCommandHandlers } from './module-videos';
import { ModuleCommandHandlers } from './modules';
import { OrderItemCommandHandlers } from './order-items';
import { OrderCommandHandlers } from './orders';
import { PaymentMethodCommandHandlers } from './payment-methods';
import { PaymentCommandHandlers } from './payments';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { ProjectCommandHandlers } from './projects';
import { SubscriptionCommandHandlers } from './subscriptions';
import { VideoAuthorCommandHandlers } from './video-authors';
import { VideoCommandHandlers } from './videos';

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
