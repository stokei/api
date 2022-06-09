import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { ActivityCommandHandlers } from './activities';
import { ActivitiesActionCommandHandlers } from './activities-actions';
import { AddressCommandHandlers } from './addresses';
import { AnswerCommandHandlers } from './answers';
import { CardCommandHandlers } from './cards';
import { CartCommandHandlers } from './carts';
import { CartsItemCommandHandlers } from './carts-items';
import { CategoryCommandHandlers } from './categories';
import { CheckoutCommandHandlers } from './checkouts';
import { CheckoutsCurrencyCommandHandlers } from './checkouts-currencies';
import { ClassroomCommandHandlers } from './classrooms';
import { ClassroomsAdminCommandHandlers } from './classrooms-admins';
import { ClassroomsEnrollmentCommandHandlers } from './classrooms-enrollments';
import { ClassroomsInstructorCommandHandlers } from './classrooms-instructors';
import { ClassroomsMaterialCommandHandlers } from './classrooms-materials';
import { ClassroomsModuleCommandHandlers } from './classrooms-modules';
import { ClassroomsPlanCommandHandlers } from './classrooms-plans';
import { ClassroomsStudentCommandHandlers } from './classrooms-students';
import { ClassroomsTagCommandHandlers } from './classrooms-tags';
import { ColorCommandHandlers } from './colors';
import { CommentCommandHandlers } from './comments';
import { CourseCommandHandlers } from './courses';
import { CoursesAdminCommandHandlers } from './courses-admins';
import { CoursesInstructorCommandHandlers } from './courses-instructors';
import { CoursesStudentCommandHandlers } from './courses-students';
import { CurrencyCommandHandlers } from './currencies';
import { DomainCommandHandlers } from './domains';
import { FileCommandHandlers } from './files';
import { ImageCommandHandlers } from './images';
import { KeywordCommandHandlers } from './keywords';
import { LanguageCommandHandlers } from './languages';
import { MetatagCommandHandlers } from './metatags';
import { ModuleCommandHandlers } from './modules';
import { ModulesMaterialCommandHandlers } from './modules-materials';
import { ModulesVideoCommandHandlers } from './modules-videos';
import { OrderCommandHandlers } from './orders';
import { OrdersAddressCommandHandlers } from './orders-addresses';
import { OrdersItemCommandHandlers } from './orders-items';
import { OrdersSellerCommandHandlers } from './orders-sellers';
import { PageCommandHandlers } from './pages';
import { PaymentCommandHandlers } from './payments';
import { PaymentsMethodCommandHandlers } from './payments-methods';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { ProductsCategoryCommandHandlers } from './products-categories';
import { ProductsImageCommandHandlers } from './products-images';
import { ProductsTagCommandHandlers } from './products-tags';
import { ProjectCommandHandlers } from './projects';
import { ProjectsMemberCommandHandlers } from './projects-members';
import { ProjectsPlanCommandHandlers } from './projects-plans';
import { QuestionCommandHandlers } from './questions';
import { RatingCommandHandlers } from './ratings';
import { SiteCommandHandlers } from './sites';
import { SitesDarkColorCommandHandlers } from './sites-dark-colors';
import { SitesLightColorCommandHandlers } from './sites-light-colors';
import { TagCommandHandlers } from './tags';
import { VersionCommandHandlers } from './versions';
import { VideoCommandHandlers } from './videos';
import { VideosAuthorCommandHandlers } from './videos-authors';
import { VideosMaterialCommandHandlers } from './videos-materials';
import { VideosSubtitleCommandHandlers } from './videos-subtitles';
import { VideosTagCommandHandlers } from './videos-tags';

export const CommandHandlers = [
  ...AccessCommandHandlers,
  ...AccountCommandHandlers,
  ...ProjectCommandHandlers,

  ...ProjectsMemberCommandHandlers,

  ...ProjectsPlanCommandHandlers,

  ...SiteCommandHandlers,

  ...SitesLightColorCommandHandlers,

  ...SitesDarkColorCommandHandlers,

  ...DomainCommandHandlers,

  ...PageCommandHandlers,

  ...MetatagCommandHandlers,

  ...TagCommandHandlers,

  ...CurrencyCommandHandlers,

  ...LanguageCommandHandlers,

  ...KeywordCommandHandlers,

  ...VersionCommandHandlers,

  ...ColorCommandHandlers,

  ...ActivityCommandHandlers,

  ...ActivitiesActionCommandHandlers,

  ...CategoryCommandHandlers,

  ...CheckoutCommandHandlers,

  ...CheckoutsCurrencyCommandHandlers,

  ...ProductCommandHandlers,

  ...ProductsCategoryCommandHandlers,

  ...ProductsImageCommandHandlers,

  ...PriceCommandHandlers,

  ...ProductsTagCommandHandlers,

  ...OrderCommandHandlers,

  ...OrdersItemCommandHandlers,

  ...OrdersAddressCommandHandlers,

  ...OrdersSellerCommandHandlers,

  ...PaymentCommandHandlers,

  ...PaymentsMethodCommandHandlers,

  ...CardCommandHandlers,

  ...CartCommandHandlers,

  ...CartsItemCommandHandlers,

  ...PlanCommandHandlers,

  ...ImageCommandHandlers,

  ...RatingCommandHandlers,

  ...CommentCommandHandlers,

  ...QuestionCommandHandlers,

  ...AnswerCommandHandlers,

  ...VideoCommandHandlers,

  ...VideosTagCommandHandlers,

  ...VideosAuthorCommandHandlers,

  ...VideosSubtitleCommandHandlers,

  ...FileCommandHandlers,

  ...ModuleCommandHandlers,

  ...ModulesVideoCommandHandlers,

  ...ModulesMaterialCommandHandlers,

  ...VideosMaterialCommandHandlers,

  ...CourseCommandHandlers,

  ...CoursesInstructorCommandHandlers,

  ...CoursesAdminCommandHandlers,

  ...CoursesStudentCommandHandlers,

  ...ClassroomCommandHandlers,

  ...ClassroomsStudentCommandHandlers,

  ...ClassroomsEnrollmentCommandHandlers,

  ...ClassroomsAdminCommandHandlers,

  ...ClassroomsInstructorCommandHandlers,

  ...ClassroomsPlanCommandHandlers,

  ...ClassroomsModuleCommandHandlers,

  ...ClassroomsTagCommandHandlers,

  ...ClassroomsMaterialCommandHandlers,

  ...AddressCommandHandlers,

  ...PhoneCommandHandlers
];
