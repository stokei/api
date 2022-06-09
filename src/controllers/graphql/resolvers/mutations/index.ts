import { AccessesMutations } from './accesses';
import { AccountsMutations } from './accounts';
import { ActivitiesMutations } from './activities';
import { ActivitiesActionsMutations } from './activities-actions';
import { AddressesMutations } from './addresses';
import { AnswersMutations } from './answers';
import { CardsMutations } from './cards';
import { CartsMutations } from './carts';
import { CartsItemsMutations } from './carts-items';
import { CategoriesMutations } from './categories';
import { CheckoutsMutations } from './checkouts';
import { CheckoutsCurrenciesMutations } from './checkouts-currencies';
import { ClassroomsMutations } from './classrooms';
import { ClassroomsAdminsMutations } from './classrooms-admins';
import { ClassroomsEnrollmentsMutations } from './classrooms-enrollments';
import { ClassroomsInstructorsMutations } from './classrooms-instructors';
import { ClassroomsMaterialsMutations } from './classrooms-materials';
import { ClassroomsModulesMutations } from './classrooms-modules';
import { ClassroomsPlansMutations } from './classrooms-plans';
import { ClassroomsStudentsMutations } from './classrooms-students';
import { ClassroomsTagsMutations } from './classrooms-tags';
import { ColorsMutations } from './colors';
import { CommentsMutations } from './comments';
import { CoursesMutations } from './courses';
import { CoursesAdminsMutations } from './courses-admins';
import { CoursesInstructorsMutations } from './courses-instructors';
import { CoursesStudentsMutations } from './courses-students';
import { CurrenciesMutations } from './currencies';
import { DomainsMutations } from './domains';
import { FilesMutations } from './files';
import { ImagesMutations } from './images';
import { KeywordsMutations } from './keywords';
import { LanguagesMutations } from './languages';
import { MetatagsMutations } from './metatags';
import { ModulesMutations } from './modules';
import { ModulesMaterialsMutations } from './modules-materials';
import { ModulesVideosMutations } from './modules-videos';
import { OrdersMutations } from './orders';
import { OrdersAddressesMutations } from './orders-addresses';
import { OrdersItemsMutations } from './orders-items';
import { OrdersSellersMutations } from './orders-sellers';
import { PagesMutations } from './pages';
import { PaymentsMutations } from './payments';
import { PaymentsMethodsMutations } from './payments-methods';
import { PhonesMutations } from './phones';
import { PlansMutations } from './plans';
import { PricesMutations } from './prices';
import { ProductsMutations } from './products';
import { ProductsCategoriesMutations } from './products-categories';
import { ProductsImagesMutations } from './products-images';
import { ProductsTagsMutations } from './products-tags';
import { ProjectsMutations } from './projects';
import { ProjectsMembersMutations } from './projects-members';
import { ProjectsPlansMutations } from './projects-plans';
import { QuestionsMutations } from './questions';
import { RatingsMutations } from './ratings';
import { SitesMutations } from './sites';
import { SitesDarkColorsMutations } from './sites-dark-colors';
import { SitesLightColorsMutations } from './sites-light-colors';
import { TagsMutations } from './tags';
import { VersionsMutations } from './versions';
import { VideosMutations } from './videos';
import { VideosAuthorsMutations } from './videos-authors';
import { VideosMaterialsMutations } from './videos-materials';
import { VideosSubtitlesMutations } from './videos-subtitles';
import { VideosTagsMutations } from './videos-tags';

export const Mutations = [
  ...AccountsMutations,
  ...AccessesMutations,
  ...ProjectsMutations,

  ...ProjectsMembersMutations,

  ...ProjectsPlansMutations,

  ...SitesMutations,

  ...SitesLightColorsMutations,

  ...SitesDarkColorsMutations,

  ...DomainsMutations,

  ...PagesMutations,

  ...MetatagsMutations,

  ...TagsMutations,

  ...CurrenciesMutations,

  ...LanguagesMutations,

  ...KeywordsMutations,

  ...VersionsMutations,

  ...ColorsMutations,

  ...ActivitiesMutations,

  ...ActivitiesActionsMutations,

  ...CategoriesMutations,

  ...CheckoutsMutations,

  ...CheckoutsCurrenciesMutations,

  ...ProductsMutations,

  ...ProductsCategoriesMutations,

  ...ProductsImagesMutations,

  ...PricesMutations,

  ...ProductsTagsMutations,

  ...OrdersMutations,

  ...OrdersItemsMutations,

  ...OrdersAddressesMutations,

  ...OrdersSellersMutations,

  ...PaymentsMutations,

  ...PaymentsMethodsMutations,

  ...CardsMutations,

  ...CartsMutations,

  ...CartsItemsMutations,

  ...PlansMutations,

  ...ImagesMutations,

  ...RatingsMutations,

  ...CommentsMutations,

  ...QuestionsMutations,

  ...AnswersMutations,

  ...VideosMutations,

  ...VideosTagsMutations,

  ...VideosAuthorsMutations,

  ...VideosSubtitlesMutations,

  ...FilesMutations,

  ...ModulesMutations,

  ...ModulesVideosMutations,

  ...ModulesMaterialsMutations,

  ...VideosMaterialsMutations,

  ...CoursesMutations,

  ...CoursesInstructorsMutations,

  ...CoursesAdminsMutations,

  ...CoursesStudentsMutations,

  ...ClassroomsMutations,

  ...ClassroomsStudentsMutations,

  ...ClassroomsEnrollmentsMutations,

  ...ClassroomsAdminsMutations,

  ...ClassroomsInstructorsMutations,

  ...ClassroomsPlansMutations,

  ...ClassroomsModulesMutations,

  ...ClassroomsTagsMutations,

  ...ClassroomsMaterialsMutations,

  ...AddressesMutations,

  ...PhonesMutations
];
