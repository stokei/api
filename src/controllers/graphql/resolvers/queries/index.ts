import { AccessesQueries } from './accesses';
import { AccountsQueries } from './accounts';
import { AddressesQueries } from './addresses';
import { CardsQueries } from './cards';
import { CartsQueries } from './carts';
import { CartsItemsQueries } from './carts-items';
import { ClassroomsQueries } from './classrooms';
import { ClassroomsInstructorsQueries } from './classrooms-instructors';
import { ClassroomsModulesQueries } from './classrooms-modules';
import { ClassroomsStudentsQueries } from './classrooms-students';
import { ColorsQueries } from './colors';
import { CoursesQueries } from './courses';
import { CoursesInstructorsQueries } from './courses-instructors';
import { CoursesStudentsQueries } from './courses-students';
import { CurrenciesQueries } from './currencies';
import { DomainsQueries } from './domains';
import { ImagesQueries } from './images';
import { LanguagesQueries } from './languages';
import { ModulesQueries } from './modules';
import { ModulesVideosQueries } from './modules-videos';
import { OrdersQueries } from './orders';
import { PaymentsQueries } from './payments';
import { PaymentsMethodsQueries } from './payments-methods';
import { PhonesQueries } from './phones';
import { PlansQueries } from './plans';
import { PricesQueries } from './prices';
import { ProductsQueries } from './products';
import { ProjectsQueries } from './projects';
import { SitesQueries } from './sites';
import { SubscriptionsQueries } from './subscriptions';
import { VideosQueries } from './videos';
import { VideosAuthorsQueries } from './videos-authors';

export const Queries = [
  ...AccountsQueries,
  ...AccessesQueries,
  ...ProjectsQueries,
  ...SitesQueries,
  ...DomainsQueries,
  ...CurrenciesQueries,
  ...LanguagesQueries,
  ...ColorsQueries,
  ...ProductsQueries,
  ...PricesQueries,
  ...OrdersQueries,
  ...PaymentsQueries,
  ...PaymentsMethodsQueries,
  ...CardsQueries,
  ...CartsQueries,
  ...CartsItemsQueries,
  ...PlansQueries,
  ...ImagesQueries,
  ...VideosQueries,
  ...VideosAuthorsQueries,
  ...ModulesQueries,
  ...ModulesVideosQueries,
  ...CoursesQueries,
  ...CoursesInstructorsQueries,
  ...CoursesStudentsQueries,
  ...ClassroomsQueries,
  ...ClassroomsStudentsQueries,
  ...SubscriptionsQueries,
  ...ClassroomsInstructorsQueries,
  ...ClassroomsModulesQueries,
  ...AddressesQueries,
  ...PhonesQueries
];
