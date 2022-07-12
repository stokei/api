import { AccessesMutations } from './accesses';
import { AccountsMutations } from './accounts';
import { AddressesMutations } from './addresses';
import { CartsMutations } from './carts';
import { CartItemsMutations } from './cart-items';
import { ClassroomInstructorsMutations } from './classroom-instructors';
import { ClassroomModulesMutations } from './classroom-modules';
import { ClassroomStudentsMutations } from './classroom-students';
import { ClassroomsMutations } from './classrooms';
import { ColorsMutations } from './colors';
import { CourseInstructorsMutations } from './course-instructors';
import { CourseStudentsMutations } from './course-students';
import { CoursesMutations } from './courses';
import { CurrenciesMutations } from './currencies';
import { DomainsMutations } from './domains';
import { ImagesMutations } from './images';
import { LanguagesMutations } from './languages';
import { ModuleVideosMutations } from './module-videos';
import { ModulesMutations } from './modules';
import { OrdersMutations } from './orders';
import { PaymentMethodsMutations } from './payment-methods';
import { PaymentsMutations } from './payments';
import { PhonesMutations } from './phones';
import { PlansMutations } from './plans';
import { PricesMutations } from './prices';
import { ProductsMutations } from './products';
import { ProjectsMutations } from './projects';
import { SubscriptionsMutations } from './subscriptions';
import { VideoAuthorsMutations } from './video-authors';
import { VideosMutations } from './videos';

export const Mutations = [
  ...AccountsMutations,
  ...AccessesMutations,
  ...ProjectsMutations,
  ...DomainsMutations,
  ...CurrenciesMutations,
  ...LanguagesMutations,
  ...ColorsMutations,
  ...ProductsMutations,
  ...PricesMutations,
  ...OrdersMutations,
  ...PaymentsMutations,
  ...PaymentMethodsMutations,
  ...CartsMutations,
  ...CartItemsMutations,
  ...PlansMutations,
  ...ImagesMutations,
  ...VideosMutations,
  ...VideoAuthorsMutations,
  ...ModulesMutations,
  ...ModuleVideosMutations,
  ...CoursesMutations,
  ...CourseInstructorsMutations,
  ...CourseStudentsMutations,
  ...ClassroomsMutations,
  ...ClassroomStudentsMutations,
  ...SubscriptionsMutations,
  ...ClassroomInstructorsMutations,
  ...ClassroomModulesMutations,
  ...AddressesMutations,
  ...PhonesMutations
];
