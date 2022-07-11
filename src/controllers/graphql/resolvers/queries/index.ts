import { AccessesQueries } from './accesses';
import { AccountsQueries } from './accounts';
import { AddressesQueries } from './addresses';
import { CardsQueries } from './cards';
import { CartsQueries } from './carts';
import { CartsItemsQueries } from './carts-items';
import { ClassroomsQueries } from './classrooms';
import { ClassroomInstructorsQueries } from './classroom-instructors';
import { ClassroomModulesQueries } from './classroom-module s';
import { ClassroomStudentsQueries } from './classroom-students';
import { ColorsQueries } from './colors';
import { CoursesQueries } from './courses';
import { CourseInstructorsQueries } from './course-instructors';
import { CourseStudentsQueries } from './course-students';
import { CurrenciesQueries } from './currencies';
import { DomainsQueries } from './domains';
import { ImagesQueries } from './images';
import { LanguagesQueries } from './languages';
import { ModulesQueries } from './modules';
import { ModuleVideosQueries } from './module-videos';
import { OrdersQueries } from './orders';
import { PaymentsQueries } from './payments';
import { PaymentMethodsQueries } from './payment-methods';
import { PhonesQueries } from './phones';
import { PlansQueries } from './plans';
import { PricesQueries } from './prices';
import { ProductsQueries } from './products';
import { ProjectsQueries } from './projects';
import { SubscriptionsQueries } from './subscriptions';
import { VideosQueries } from './videos';
import { VideosAuthorsQueries } from './videos-authors';

export const Queries = [
  ...AccountsQueries,
  ...AccessesQueries,
  ...ProjectsQueries,
  ...DomainsQueries,
  ...CurrenciesQueries,
  ...LanguagesQueries,
  ...ColorsQueries,
  ...ProductsQueries,
  ...PricesQueries,
  ...OrdersQueries,
  ...PaymentsQueries,
  ...PaymentMethodsQueries,
  ...CardsQueries,
  ...CartsQueries,
  ...CartsItemsQueries,
  ...PlansQueries,
  ...ImagesQueries,
  ...VideosQueries,
  ...VideosAuthorsQueries,
  ...ModulesQueries,
  ...ModuleVideosQueries,
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
