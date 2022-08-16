import { AccessesLoader } from './accesses.loader';
import { AccountsLoader } from './accounts.loader';
import { AddressesLoader } from './addresses.loader';
import { AppsLoader } from './apps.loader';
import { ClassroomInstructorsLoader } from './classroom-instructors.loader';
import { ClassroomModulesLoader } from './classroom-modules.loader';
import { ClassroomStudentsLoader } from './classroom-students.loader';
import { ClassroomsLoader } from './classrooms.loader';
import { ColorsLoader } from './colors.loader';
import { CourseInstructorsLoader } from './course-instructors.loader';
import { CourseStudentsLoader } from './course-students.loader';
import { CoursesLoader } from './courses.loader';
import { CurrenciesLoader } from './currencies.loader';
import { DomainsLoader } from './domains.loader';
import { ImagesLoader } from './images.loader';
import { LanguagesLoader } from './languages.loader';
import { ModulesLoader } from './modules.loader';
import { PaymentMethodsLoader } from './payment-methods.loader';
import { PhonesLoader } from './phones.loader';
import { PlansLoader } from './plans.loader';
import { PricesLoader } from './prices.loader';
import { ProductsLoader } from './products.loader';
import { SubscriptionContractsLoader } from './subscription-contracts.loader';
import { VideoAuthorsLoader } from './video-authors.loader';
import { VideosLoader } from './videos.loader';

export const Loaders = [
  AccountsLoader,
  AccessesLoader,
  AppsLoader,
  DomainsLoader,
  CurrenciesLoader,
  LanguagesLoader,
  ColorsLoader,
  ProductsLoader,
  PricesLoader,
  PaymentMethodsLoader,
  PlansLoader,
  ImagesLoader,
  VideosLoader,
  VideoAuthorsLoader,
  ModulesLoader,
  CoursesLoader,
  CourseInstructorsLoader,
  CourseStudentsLoader,
  ClassroomsLoader,
  ClassroomStudentsLoader,
  SubscriptionContractsLoader,
  ClassroomInstructorsLoader,
  ClassroomModulesLoader,
  AddressesLoader,
  PhonesLoader
];
