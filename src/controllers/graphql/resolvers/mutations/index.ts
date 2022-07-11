import { AccessesMutations } from './accesses';
import { AccountsMutations } from './accounts';
import { AddressesMutations } from './addresses';
import { CardsMutations } from './cards';
import { CartsMutations } from './carts';
import { CartsItemsMutations } from './carts-items';
import { ClassroomsMutations } from './classrooms';
import { ClassroomInstructorsMutations } from './classroom-instructors';
import { ClassroomModulesMutations } from './classroom-module s';
import { ClassroomStudentsMutations } from './classroom-students';
import { ColorsMutations } from './colors';
import { CoursesMutations } from './courses';
import { CoursesInstructorsMutations } from './courses-instructors';
import { CoursesStudentsMutations } from './courses-students';
import { CurrenciesMutations } from './currencies';
import { DomainsMutations } from './domains';
import { ImagesMutations } from './images';
import { LanguagesMutations } from './languages';
import { ModulesMutations } from './modules';
import { ModulesVideosMutations } from './modules-videos';
import { OrdersMutations } from './orders';
import { PaymentsMutations } from './payments';
import { PaymentsMethodsMutations } from './payments-methods';
import { PhonesMutations } from './phones';
import { PlansMutations } from './plans';
import { PricesMutations } from './prices';
import { ProductsMutations } from './products';
import { ProjectsMutations } from './projects';
import { SubscriptionsMutations } from './subscriptions';
import { VideosMutations } from './videos';
import { VideosAuthorsMutations } from './videos-authors';

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
  ...PaymentsMethodsMutations,
  ...CardsMutations,
  ...CartsMutations,
  ...CartsItemsMutations,
  ...PlansMutations,
  ...ImagesMutations,
  ...VideosMutations,
  ...VideosAuthorsMutations,
  ...ModulesMutations,
  ...ModulesVideosMutations,
  ...CoursesMutations,
  ...CoursesInstructorsMutations,
  ...CoursesStudentsMutations,
  ...ClassroomsMutations,
  ...ClassroomStudentsMutations,
  ...SubscriptionsMutations,
  ...ClassroomInstructorsMutations,
  ...ClassroomModulesMutations,
  ...AddressesMutations,
  ...PhonesMutations
];
