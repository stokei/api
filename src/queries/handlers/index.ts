import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';
import { ActivityQueriesHandlers } from './activities';
import { ActivitiesActionQueriesHandlers } from './activities-actions';
import { AddressQueriesHandlers } from './addresses';
import { AnswerQueriesHandlers } from './answers';
import { CardQueriesHandlers } from './cards';
import { CartQueriesHandlers } from './carts';
import { CartsItemQueriesHandlers } from './carts-items';
import { CategoryQueriesHandlers } from './categories';
import { CheckoutQueriesHandlers } from './checkouts';
import { CheckoutsCurrencyQueriesHandlers } from './checkouts-currencies';
import { ClassroomQueriesHandlers } from './classrooms';
import { ClassroomsAdminQueriesHandlers } from './classrooms-admins';
import { ClassroomsEnrollmentQueriesHandlers } from './classrooms-enrollments';
import { ClassroomsInstructorQueriesHandlers } from './classrooms-instructors';
import { ClassroomsMaterialQueriesHandlers } from './classrooms-materials';
import { ClassroomsModuleQueriesHandlers } from './classrooms-modules';
import { ClassroomsPlanQueriesHandlers } from './classrooms-plans';
import { ClassroomsStudentQueriesHandlers } from './classrooms-students';
import { ClassroomsTagQueriesHandlers } from './classrooms-tags';
import { ColorQueriesHandlers } from './colors';
import { CommentQueriesHandlers } from './comments';
import { CourseQueriesHandlers } from './courses';
import { CoursesAdminQueriesHandlers } from './courses-admins';
import { CoursesInstructorQueriesHandlers } from './courses-instructors';
import { CoursesStudentQueriesHandlers } from './courses-students';
import { CurrencyQueriesHandlers } from './currencies';
import { DomainQueriesHandlers } from './domains';
import { FileQueriesHandlers } from './files';
import { ImageQueriesHandlers } from './images';
import { KeywordQueriesHandlers } from './keywords';
import { LanguageQueriesHandlers } from './languages';
import { MetatagQueriesHandlers } from './metatags';
import { ModuleQueriesHandlers } from './modules';
import { ModulesMaterialQueriesHandlers } from './modules-materials';
import { ModulesVideoQueriesHandlers } from './modules-videos';
import { OrderQueriesHandlers } from './orders';
import { OrdersAddressQueriesHandlers } from './orders-addresses';
import { OrdersItemQueriesHandlers } from './orders-items';
import { OrdersSellerQueriesHandlers } from './orders-sellers';
import { PageQueriesHandlers } from './pages';
import { PaymentQueriesHandlers } from './payments';
import { PaymentsMethodQueriesHandlers } from './payments-methods';
import { PhoneQueriesHandlers } from './phones';
import { PlanQueriesHandlers } from './plans';
import { PriceQueriesHandlers } from './prices';
import { ProductQueriesHandlers } from './products';
import { ProductsCategoryQueriesHandlers } from './products-categories';
import { ProductsImageQueriesHandlers } from './products-images';
import { ProductsTagQueriesHandlers } from './products-tags';
import { ProjectQueriesHandlers } from './projects';
import { ProjectsMemberQueriesHandlers } from './projects-members';
import { ProjectsPlanQueriesHandlers } from './projects-plans';
import { QuestionQueriesHandlers } from './questions';
import { RatingQueriesHandlers } from './ratings';
import { SiteQueriesHandlers } from './sites';
import { SitesDarkColorQueriesHandlers } from './sites-dark-colors';
import { SitesLightColorQueriesHandlers } from './sites-light-colors';
import { TagQueriesHandlers } from './tags';
import { VersionQueriesHandlers } from './versions';
import { VideoQueriesHandlers } from './videos';
import { VideosAuthorQueriesHandlers } from './videos-authors';
import { VideosMaterialQueriesHandlers } from './videos-materials';
import { VideosSubtitleQueriesHandlers } from './videos-subtitles';
import { VideosTagQueriesHandlers } from './videos-tags';

export const QueriesHandlers = [
  ...AccountQueriesHandlers,

  ...AccessQueriesHandlers,
  ...ProjectQueriesHandlers,

  ...ProjectsMemberQueriesHandlers,

  ...ProjectsPlanQueriesHandlers,

  ...SiteQueriesHandlers,

  ...SitesLightColorQueriesHandlers,

  ...SitesDarkColorQueriesHandlers,

  ...DomainQueriesHandlers,

  ...PageQueriesHandlers,

  ...MetatagQueriesHandlers,

  ...TagQueriesHandlers,

  ...CurrencyQueriesHandlers,

  ...LanguageQueriesHandlers,

  ...KeywordQueriesHandlers,

  ...VersionQueriesHandlers,

  ...ColorQueriesHandlers,

  ...ActivityQueriesHandlers,

  ...ActivitiesActionQueriesHandlers,

  ...CategoryQueriesHandlers,

  ...CheckoutQueriesHandlers,

  ...CheckoutsCurrencyQueriesHandlers,

  ...ProductQueriesHandlers,

  ...ProductsCategoryQueriesHandlers,

  ...ProductsImageQueriesHandlers,

  ...PriceQueriesHandlers,

  ...ProductsTagQueriesHandlers,

  ...OrderQueriesHandlers,

  ...OrdersItemQueriesHandlers,

  ...OrdersAddressQueriesHandlers,

  ...OrdersSellerQueriesHandlers,

  ...PaymentQueriesHandlers,

  ...PaymentsMethodQueriesHandlers,

  ...CardQueriesHandlers,

  ...CartQueriesHandlers,

  ...CartsItemQueriesHandlers,

  ...PlanQueriesHandlers,

  ...ImageQueriesHandlers,

  ...RatingQueriesHandlers,

  ...CommentQueriesHandlers,

  ...QuestionQueriesHandlers,

  ...AnswerQueriesHandlers,

  ...VideoQueriesHandlers,

  ...VideosTagQueriesHandlers,

  ...VideosAuthorQueriesHandlers,

  ...VideosSubtitleQueriesHandlers,

  ...FileQueriesHandlers,

  ...ModuleQueriesHandlers,

  ...ModulesVideoQueriesHandlers,

  ...ModulesMaterialQueriesHandlers,

  ...VideosMaterialQueriesHandlers,

  ...CourseQueriesHandlers,

  ...CoursesInstructorQueriesHandlers,

  ...CoursesAdminQueriesHandlers,

  ...CoursesStudentQueriesHandlers,

  ...ClassroomQueriesHandlers,

  ...ClassroomsStudentQueriesHandlers,

  ...ClassroomsEnrollmentQueriesHandlers,

  ...ClassroomsAdminQueriesHandlers,

  ...ClassroomsInstructorQueriesHandlers,

  ...ClassroomsPlanQueriesHandlers,

  ...ClassroomsModuleQueriesHandlers,

  ...ClassroomsTagQueriesHandlers,

  ...ClassroomsMaterialQueriesHandlers,

  ...AddressQueriesHandlers,

  ...PhoneQueriesHandlers
];
