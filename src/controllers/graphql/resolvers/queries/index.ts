import { AccessesQueries } from './accesses';
import { AccountsQueries } from './accounts';
import { AddressesQueries } from './addresses';
import { AppsQueries } from './apps';
import { CartItemsQueries } from './cart-items';
import { CartsQueries } from './carts';
import { ClassroomInstructorsQueries } from './classroom-instructors';
import { ClassroomModulesQueries } from './classroom-modules';
import { ClassroomStudentsQueries } from './classroom-students';
import { ClassroomsQueries } from './classrooms';
import { ColorsQueries } from './colors';
import { CourseInstructorsQueries } from './course-instructors';
import { CourseStudentsQueries } from './course-students';
import { CoursesQueries } from './courses';
import { CurrenciesQueries } from './currencies';
import { DomainsQueries } from './domains';
import { ImagesQueries } from './images';
import { LanguagesQueries } from './languages';
import { ModulesQueries } from './modules';
import { OrdersQueries } from './orders';
import { PaymentMethodsQueries } from './payment-methods';
import { PaymentsQueries } from './payments';
import { PhonesQueries } from './phones';
import { PlansQueries } from './plans';
import { PricesQueries } from './prices';
import { ProductsQueries } from './products';
import { SubscriptionsQueries } from './subscriptions';
import { VideoAuthorsQueries } from './video-authors';
import { VideosQueries } from './videos';

export const Queries = [
  ...AccountsQueries,
  ...AccessesQueries,
  ...AppsQueries,
  ...DomainsQueries,
  ...CurrenciesQueries,
  ...LanguagesQueries,
  ...ColorsQueries,
  ...ProductsQueries,
  ...PricesQueries,
  ...OrdersQueries,
  ...PaymentsQueries,
  ...PaymentMethodsQueries,
  ...CartsQueries,
  ...CartItemsQueries,
  ...PlansQueries,
  ...ImagesQueries,
  ...VideosQueries,
  ...VideoAuthorsQueries,
  ...ModulesQueries,
  ...CoursesQueries,
  ...CourseInstructorsQueries,
  ...CourseStudentsQueries,
  ...ClassroomsQueries,
  ...ClassroomStudentsQueries,
  ...SubscriptionsQueries,
  ...ClassroomInstructorsQueries,
  ...ClassroomModulesQueries,
  ...AddressesQueries,
  ...PhonesQueries
];
