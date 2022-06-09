import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';
import { ActivityEventsHandlers } from './activities';
import { ActivitiesActionEventsHandlers } from './activities-actions';
import { AddressEventsHandlers } from './addresses';
import { AnswerEventsHandlers } from './answers';
import { CardEventsHandlers } from './cards';
import { CartEventsHandlers } from './carts';
import { CartsItemEventsHandlers } from './carts-items';
import { CategoryEventsHandlers } from './categories';
import { CheckoutEventsHandlers } from './checkouts';
import { CheckoutsCurrencyEventsHandlers } from './checkouts-currencies';
import { ClassroomEventsHandlers } from './classrooms';
import { ClassroomsAdminEventsHandlers } from './classrooms-admins';
import { ClassroomsEnrollmentEventsHandlers } from './classrooms-enrollments';
import { ClassroomsInstructorEventsHandlers } from './classrooms-instructors';
import { ClassroomsMaterialEventsHandlers } from './classrooms-materials';
import { ClassroomsModuleEventsHandlers } from './classrooms-modules';
import { ClassroomsPlanEventsHandlers } from './classrooms-plans';
import { ClassroomsStudentEventsHandlers } from './classrooms-students';
import { ClassroomsTagEventsHandlers } from './classrooms-tags';
import { ColorEventsHandlers } from './colors';
import { CommentEventsHandlers } from './comments';
import { CourseEventsHandlers } from './courses';
import { CoursesAdminEventsHandlers } from './courses-admins';
import { CoursesInstructorEventsHandlers } from './courses-instructors';
import { CoursesStudentEventsHandlers } from './courses-students';
import { CurrencyEventsHandlers } from './currencies';
import { DomainEventsHandlers } from './domains';
import { FileEventsHandlers } from './files';
import { ImageEventsHandlers } from './images';
import { KeywordEventsHandlers } from './keywords';
import { LanguageEventsHandlers } from './languages';
import { MetatagEventsHandlers } from './metatags';
import { ModuleEventsHandlers } from './modules';
import { ModulesMaterialEventsHandlers } from './modules-materials';
import { ModulesVideoEventsHandlers } from './modules-videos';
import { OrderEventsHandlers } from './orders';
import { OrdersAddressEventsHandlers } from './orders-addresses';
import { OrdersItemEventsHandlers } from './orders-items';
import { OrdersSellerEventsHandlers } from './orders-sellers';
import { PageEventsHandlers } from './pages';
import { PaymentEventsHandlers } from './payments';
import { PaymentsMethodEventsHandlers } from './payments-methods';
import { PhoneEventsHandlers } from './phones';
import { PlanEventsHandlers } from './plans';
import { PriceEventsHandlers } from './prices';
import { ProductEventsHandlers } from './products';
import { ProductsCategoryEventsHandlers } from './products-categories';
import { ProductsImageEventsHandlers } from './products-images';
import { ProductsTagEventsHandlers } from './products-tags';
import { ProjectEventsHandlers } from './projects';
import { ProjectsMemberEventsHandlers } from './projects-members';
import { ProjectsPlanEventsHandlers } from './projects-plans';
import { QuestionEventsHandlers } from './questions';
import { RatingEventsHandlers } from './ratings';
import { SiteEventsHandlers } from './sites';
import { SitesDarkColorEventsHandlers } from './sites-dark-colors';
import { SitesLightColorEventsHandlers } from './sites-light-colors';
import { TagEventsHandlers } from './tags';
import { VersionEventsHandlers } from './versions';
import { VideoEventsHandlers } from './videos';
import { VideosAuthorEventsHandlers } from './videos-authors';
import { VideosMaterialEventsHandlers } from './videos-materials';
import { VideosSubtitleEventsHandlers } from './videos-subtitles';
import { VideosTagEventsHandlers } from './videos-tags';

export const EventsHandlers = [
  ...AccountEventsHandlers,

  ...AccessEventsHandlers,
  ...ProjectEventsHandlers,

  ...ProjectsMemberEventsHandlers,

  ...ProjectsPlanEventsHandlers,

  ...SiteEventsHandlers,

  ...SitesLightColorEventsHandlers,

  ...SitesDarkColorEventsHandlers,

  ...DomainEventsHandlers,

  ...PageEventsHandlers,

  ...MetatagEventsHandlers,

  ...TagEventsHandlers,

  ...CurrencyEventsHandlers,

  ...LanguageEventsHandlers,

  ...KeywordEventsHandlers,

  ...VersionEventsHandlers,

  ...ColorEventsHandlers,

  ...ActivityEventsHandlers,

  ...ActivitiesActionEventsHandlers,

  ...CategoryEventsHandlers,

  ...CheckoutEventsHandlers,

  ...CheckoutsCurrencyEventsHandlers,

  ...ProductEventsHandlers,

  ...ProductsCategoryEventsHandlers,

  ...ProductsImageEventsHandlers,

  ...PriceEventsHandlers,

  ...ProductsTagEventsHandlers,

  ...OrderEventsHandlers,

  ...OrdersItemEventsHandlers,

  ...OrdersAddressEventsHandlers,

  ...OrdersSellerEventsHandlers,

  ...PaymentEventsHandlers,

  ...PaymentsMethodEventsHandlers,

  ...CardEventsHandlers,

  ...CartEventsHandlers,

  ...CartsItemEventsHandlers,

  ...PlanEventsHandlers,

  ...ImageEventsHandlers,

  ...RatingEventsHandlers,

  ...CommentEventsHandlers,

  ...QuestionEventsHandlers,

  ...AnswerEventsHandlers,

  ...VideoEventsHandlers,

  ...VideosTagEventsHandlers,

  ...VideosAuthorEventsHandlers,

  ...VideosSubtitleEventsHandlers,

  ...FileEventsHandlers,

  ...ModuleEventsHandlers,

  ...ModulesVideoEventsHandlers,

  ...ModulesMaterialEventsHandlers,

  ...VideosMaterialEventsHandlers,

  ...CourseEventsHandlers,

  ...CoursesInstructorEventsHandlers,

  ...CoursesAdminEventsHandlers,

  ...CoursesStudentEventsHandlers,

  ...ClassroomEventsHandlers,

  ...ClassroomsStudentEventsHandlers,

  ...ClassroomsEnrollmentEventsHandlers,

  ...ClassroomsAdminEventsHandlers,

  ...ClassroomsInstructorEventsHandlers,

  ...ClassroomsPlanEventsHandlers,

  ...ClassroomsModuleEventsHandlers,

  ...ClassroomsTagEventsHandlers,

  ...ClassroomsMaterialEventsHandlers,

  ...AddressEventsHandlers,

  ...PhoneEventsHandlers
];
