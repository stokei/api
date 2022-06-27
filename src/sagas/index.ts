import { AccessesSagas } from './accesses.saga';
import { AccountsSagas } from './accounts.saga';
import { AddressesSagas } from './addresses.saga';
import { CardsSagas } from './cards.saga';
import { CartsSagas } from './carts.saga';
import { CartsItemsSagas } from './carts-items.saga';
import { ClassroomsSagas } from './classrooms.saga';
import { ClassroomsInstructorsSagas } from './classrooms-instructors.saga';
import { ClassroomsModulesSagas } from './classrooms-modules.saga';
import { ClassroomsStudentsSagas } from './classrooms-students.saga';
import { ColorsSagas } from './colors.saga';
import { CoursesSagas } from './courses.saga';
import { CoursesInstructorsSagas } from './courses-instructors.saga';
import { CoursesStudentsSagas } from './courses-students.saga';
import { CurrenciesSagas } from './currencies.saga';
import { DomainsSagas } from './domains.saga';
import { ImagesSagas } from './images.saga';
import { LanguagesSagas } from './languages.saga';
import { ModulesSagas } from './modules.saga';
import { ModulesVideosSagas } from './modules-videos.saga';
import { OrdersSagas } from './orders.saga';
import { OrdersItemsSagas } from './orders-items.saga';
import { PaymentsSagas } from './payments.saga';
import { PaymentsMethodsSagas } from './payments-methods.saga';
import { PhonesSagas } from './phones.saga';
import { PlansSagas } from './plans.saga';
import { PricesSagas } from './prices.saga';
import { ProductsSagas } from './products.saga';
import { ProjectsSagas } from './projects.saga';
import { SitesSagas } from './sites.saga';
import { SubscriptionsSagas } from './subscriptions.saga';
import { VideosSagas } from './videos.saga';
import { VideosAuthorsSagas } from './videos-authors.saga';

export const Sagas = [
  AccountsSagas,
  AccessesSagas,
  ProjectsSagas,
  SitesSagas,
  DomainsSagas,
  CurrenciesSagas,
  LanguagesSagas,
  ColorsSagas,
  ProductsSagas,
  PricesSagas,
  OrdersSagas,
  OrdersItemsSagas,
  PaymentsSagas,
  PaymentsMethodsSagas,
  CardsSagas,
  CartsSagas,
  CartsItemsSagas,
  PlansSagas,
  ImagesSagas,
  VideosSagas,
  VideosAuthorsSagas,
  ModulesSagas,
  ModulesVideosSagas,
  CoursesSagas,
  CoursesInstructorsSagas,
  CoursesStudentsSagas,
  ClassroomsSagas,
  ClassroomsStudentsSagas,
  SubscriptionsSagas,
  ClassroomsInstructorsSagas,
  ClassroomsModulesSagas,
  AddressesSagas,
  PhonesSagas
];
