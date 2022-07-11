import { AccessesRepositories } from './accesses';
import { AccountsRepositories } from './accounts';
import { AddressesRepositories } from './addresses';
import { CardsRepositories } from './cards';
import { CartsRepositories } from './carts';
import { CartsItemsRepositories } from './carts-items';
import { ClassroomsRepositories } from './classrooms';
import { ClassroomInstructorsRepositories } from './classroom-instructors';
import { ClassroomModulesRepositories } from './classroom-module s';
import { ClassroomStudentsRepositories } from './classroom-students';
import { ColorsRepositories } from './colors';
import { CoursesRepositories } from './courses';
import { CoursesInstructorsRepositories } from './courses-instructors';
import { CoursesStudentsRepositories } from './courses-students';
import { CurrenciesRepositories } from './currencies';
import { DomainsRepositories } from './domains';
import { ImagesRepositories } from './images';
import { LanguagesRepositories } from './languages';
import { ModulesRepositories } from './modules';
import { ModulesVideosRepositories } from './modules-videos';
import { OrdersRepositories } from './orders';
import { OrdersItemsRepositories } from './orders-items';
import { PaymentsRepositories } from './payments';
import { PaymentsMethodsRepositories } from './payments-methods';
import { PhonesRepositories } from './phones';
import { PlansRepositories } from './plans';
import { PricesRepositories } from './prices';
import { ProductsRepositories } from './products';
import { ProjectsRepositories } from './projects';
import { SubscriptionsRepositories } from './subscriptions';
import { VideosRepositories } from './videos';
import { VideosAuthorsRepositories } from './videos-authors';

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
  ...OrdersItemsRepositories,
  ...PaymentsRepositories,
  ...PaymentsMethodsRepositories,
  ...CardsRepositories,
  ...CartsRepositories,
  ...CartsItemsRepositories,
  ...PlansRepositories,
  ...ImagesRepositories,
  ...VideosRepositories,
  ...VideosAuthorsRepositories,
  ...ModulesRepositories,
  ...ModulesVideosRepositories,
  ...CoursesRepositories,
  ...CoursesInstructorsRepositories,
  ...CoursesStudentsRepositories,
  ...ClassroomsRepositories,
  ...ClassroomStudentsRepositories,
  ...SubscriptionsRepositories,
  ...ClassroomInstructorsRepositories,
  ...ClassroomModulesRepositories,
  ...AddressesRepositories,
  ...PhonesRepositories
];
