import { AccessesRepositories } from './accesses';
import { AccountsRepositories } from './accounts';
import { AddressesRepositories } from './addresses';
import { CartsRepositories } from './carts';
import { CartItemsRepositories } from './cart-items';
import { ClassroomInstructorsRepositories } from './classroom-instructors';
import { ClassroomModulesRepositories } from './classroom-modules';
import { ClassroomStudentsRepositories } from './classroom-students';
import { ClassroomsRepositories } from './classrooms';
import { ColorsRepositories } from './colors';
import { CourseInstructorsRepositories } from './course-instructors';
import { CourseStudentsRepositories } from './course-students';
import { CoursesRepositories } from './courses';
import { CurrenciesRepositories } from './currencies';
import { DomainsRepositories } from './domains';
import { ImagesRepositories } from './images';
import { LanguagesRepositories } from './languages';
import { ModuleVideosRepositories } from './module-videos';
import { ModulesRepositories } from './modules';
import { OrderItemsRepositories } from './order-items';
import { OrdersRepositories } from './orders';
import { PaymentMethodsRepositories } from './payment-methods';
import { PaymentsRepositories } from './payments';
import { PhonesRepositories } from './phones';
import { PlansRepositories } from './plans';
import { PricesRepositories } from './prices';
import { ProductsRepositories } from './products';
import { ProjectsRepositories } from './projects';
import { SubscriptionsRepositories } from './subscriptions';
import { VideoAuthorsRepositories } from './video-authors';
import { VideosRepositories } from './videos';

export const Repositories = [
  ...AccountsRepositories,
  ...AccessesRepositories,
  ...ProjectsRepositories,
  ...DomainsRepositories,
  ...CurrenciesRepositories,
  ...LanguagesRepositories,
  ...ColorsRepositories,
  ...ProductsRepositories,
  ...PricesRepositories,
  ...OrdersRepositories,
  ...OrderItemsRepositories,
  ...PaymentsRepositories,
  ...PaymentMethodsRepositories,
  ...CartsRepositories,
  ...CartItemsRepositories,
  ...PlansRepositories,
  ...ImagesRepositories,
  ...VideosRepositories,
  ...VideoAuthorsRepositories,
  ...ModulesRepositories,
  ...ModuleVideosRepositories,
  ...CoursesRepositories,
  ...CourseInstructorsRepositories,
  ...CourseStudentsRepositories,
  ...ClassroomsRepositories,
  ...ClassroomStudentsRepositories,
  ...SubscriptionsRepositories,
  ...ClassroomInstructorsRepositories,
  ...ClassroomModulesRepositories,
  ...AddressesRepositories,
  ...PhonesRepositories
];
