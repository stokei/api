import { AccessesSagas } from './accesses.saga';
import { AccountsSagas } from './accounts.saga';
import { ActivitiesSagas } from './activities.saga';
import { ActivitiesActionsSagas } from './activities-actions.saga';
import { AddressesSagas } from './addresses.saga';
import { AnswersSagas } from './answers.saga';
import { CardsSagas } from './cards.saga';
import { CartsSagas } from './carts.saga';
import { CartsItemsSagas } from './carts-items.saga';
import { CategoriesSagas } from './categories.saga';
import { CheckoutsSagas } from './checkouts.saga';
import { CheckoutsCurrenciesSagas } from './checkouts-currencies.saga';
import { ClassroomsSagas } from './classrooms.saga';
import { ClassroomsAdminsSagas } from './classrooms-admins.saga';
import { ClassroomsEnrollmentsSagas } from './classrooms-enrollments.saga';
import { ClassroomsInstructorsSagas } from './classrooms-instructors.saga';
import { ClassroomsMaterialsSagas } from './classrooms-materials.saga';
import { ClassroomsModulesSagas } from './classrooms-modules.saga';
import { ClassroomsPlansSagas } from './classrooms-plans.saga';
import { ClassroomsStudentsSagas } from './classrooms-students.saga';
import { ClassroomsTagsSagas } from './classrooms-tags.saga';
import { ColorsSagas } from './colors.saga';
import { CommentsSagas } from './comments.saga';
import { CoursesSagas } from './courses.saga';
import { CoursesAdminsSagas } from './courses-admins.saga';
import { CoursesInstructorsSagas } from './courses-instructors.saga';
import { CoursesStudentsSagas } from './courses-students.saga';
import { CurrenciesSagas } from './currencies.saga';
import { DomainsSagas } from './domains.saga';
import { FilesSagas } from './files.saga';
import { ImagesSagas } from './images.saga';
import { KeywordsSagas } from './keywords.saga';
import { LanguagesSagas } from './languages.saga';
import { MetatagsSagas } from './metatags.saga';
import { ModulesSagas } from './modules.saga';
import { ModulesMaterialsSagas } from './modules-materials.saga';
import { ModulesVideosSagas } from './modules-videos.saga';
import { OrdersSagas } from './orders.saga';
import { OrdersAddressesSagas } from './orders-addresses.saga';
import { OrdersItemsSagas } from './orders-items.saga';
import { OrdersSellersSagas } from './orders-sellers.saga';
import { PagesSagas } from './pages.saga';
import { PaymentsSagas } from './payments.saga';
import { PaymentsMethodsSagas } from './payments-methods.saga';
import { PhonesSagas } from './phones.saga';
import { PlansSagas } from './plans.saga';
import { PricesSagas } from './prices.saga';
import { ProductsSagas } from './products.saga';
import { ProductsCategoriesSagas } from './products-categories.saga';
import { ProductsImagesSagas } from './products-images.saga';
import { ProductsTagsSagas } from './products-tags.saga';
import { ProjectsSagas } from './projects.saga';
import { ProjectsMembersSagas } from './projects-members.saga';
import { ProjectsPlansSagas } from './projects-plans.saga';
import { QuestionsSagas } from './questions.saga';
import { RatingsSagas } from './ratings.saga';
import { SitesSagas } from './sites.saga';
import { SitesDarkColorsSagas } from './sites-dark-colors.saga';
import { SitesLightColorsSagas } from './sites-light-colors.saga';
import { TagsSagas } from './tags.saga';
import { VersionsSagas } from './versions.saga';
import { VideosSagas } from './videos.saga';
import { VideosAuthorsSagas } from './videos-authors.saga';
import { VideosMaterialsSagas } from './videos-materials.saga';
import { VideosSubtitlesSagas } from './videos-subtitles.saga';
import { VideosTagsSagas } from './videos-tags.saga';

export const Sagas = [
  AccountsSagas,
  AccessesSagas,
  ProjectsSagas,

  ProjectsMembersSagas,

  ProjectsPlansSagas,

  SitesSagas,

  SitesLightColorsSagas,

  SitesDarkColorsSagas,

  DomainsSagas,

  PagesSagas,

  MetatagsSagas,

  TagsSagas,

  CurrenciesSagas,

  LanguagesSagas,

  KeywordsSagas,

  VersionsSagas,

  ColorsSagas,

  ActivitiesSagas,

  ActivitiesActionsSagas,

  CategoriesSagas,

  CheckoutsSagas,

  CheckoutsCurrenciesSagas,

  ProductsSagas,

  ProductsCategoriesSagas,

  ProductsImagesSagas,

  PricesSagas,

  ProductsTagsSagas,

  OrdersSagas,

  OrdersItemsSagas,

  OrdersAddressesSagas,

  OrdersSellersSagas,

  PaymentsSagas,

  PaymentsMethodsSagas,

  CardsSagas,

  CartsSagas,

  CartsItemsSagas,

  PlansSagas,

  ImagesSagas,

  RatingsSagas,

  CommentsSagas,

  QuestionsSagas,

  AnswersSagas,

  VideosSagas,

  VideosTagsSagas,

  VideosAuthorsSagas,

  VideosSubtitlesSagas,

  FilesSagas,

  ModulesSagas,

  ModulesVideosSagas,

  ModulesMaterialsSagas,

  VideosMaterialsSagas,

  CoursesSagas,

  CoursesInstructorsSagas,

  CoursesAdminsSagas,

  CoursesStudentsSagas,

  ClassroomsSagas,

  ClassroomsStudentsSagas,

  ClassroomsEnrollmentsSagas,

  ClassroomsAdminsSagas,

  ClassroomsInstructorsSagas,

  ClassroomsPlansSagas,

  ClassroomsModulesSagas,

  ClassroomsTagsSagas,

  ClassroomsMaterialsSagas,

  AddressesSagas,

  PhonesSagas
];
