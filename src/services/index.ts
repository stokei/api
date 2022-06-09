import { AccessServices } from './accesses';
import { AccountServices } from './accounts';
import { ActivityServices } from './activities';
import { ActivitiesActionServices } from './activities-actions';
import { AddressServices } from './addresses';
import { AnswerServices } from './answers';
import { CardServices } from './cards';
import { CartServices } from './carts';
import { CartsItemServices } from './carts-items';
import { CategoryServices } from './categories';
import { CheckoutServices } from './checkouts';
import { CheckoutsCurrencyServices } from './checkouts-currencies';
import { ClassroomServices } from './classrooms';
import { ClassroomsAdminServices } from './classrooms-admins';
import { ClassroomsEnrollmentServices } from './classrooms-enrollments';
import { ClassroomsInstructorServices } from './classrooms-instructors';
import { ClassroomsMaterialServices } from './classrooms-materials';
import { ClassroomsModuleServices } from './classrooms-modules';
import { ClassroomsPlanServices } from './classrooms-plans';
import { ClassroomsStudentServices } from './classrooms-students';
import { ClassroomsTagServices } from './classrooms-tags';
import { ColorServices } from './colors';
import { CommentServices } from './comments';
import { CourseServices } from './courses';
import { CoursesAdminServices } from './courses-admins';
import { CoursesInstructorServices } from './courses-instructors';
import { CoursesStudentServices } from './courses-students';
import { CurrencyServices } from './currencies';
import { DomainServices } from './domains';
import { FileServices } from './files';
import { ImageServices } from './images';
import { KeywordServices } from './keywords';
import { LanguageServices } from './languages';
import { MetatagServices } from './metatags';
import { ModuleServices } from './modules';
import { ModulesMaterialServices } from './modules-materials';
import { ModulesVideoServices } from './modules-videos';
import { OrderServices } from './orders';
import { OrdersAddressServices } from './orders-addresses';
import { OrdersItemServices } from './orders-items';
import { OrdersSellerServices } from './orders-sellers';
import { PageServices } from './pages';
import { PaymentServices } from './payments';
import { PaymentsMethodServices } from './payments-methods';
import { PhoneServices } from './phones';
import { PlanServices } from './plans';
import { PriceServices } from './prices';
import { ProductServices } from './products';
import { ProductsCategoryServices } from './products-categories';
import { ProductsImageServices } from './products-images';
import { ProductsTagServices } from './products-tags';
import { ProjectServices } from './projects';
import { ProjectsMemberServices } from './projects-members';
import { ProjectsPlanServices } from './projects-plans';
import { QuestionServices } from './questions';
import { RatingServices } from './ratings';
import { SiteServices } from './sites';
import { SitesDarkColorServices } from './sites-dark-colors';
import { SitesLightColorServices } from './sites-light-colors';
import { TagServices } from './tags';
import { VersionServices } from './versions';
import { VideoServices } from './videos';
import { VideosAuthorServices } from './videos-authors';
import { VideosMaterialServices } from './videos-materials';
import { VideosSubtitleServices } from './videos-subtitles';
import { VideosTagServices } from './videos-tags';

export const Services = [
  ...AccountServices,
  ...AccessServices,
  ...ProjectServices,

  ...ProjectsMemberServices,

  ...ProjectsPlanServices,

  ...SiteServices,

  ...SitesLightColorServices,

  ...SitesDarkColorServices,

  ...DomainServices,

  ...PageServices,

  ...MetatagServices,

  ...TagServices,

  ...CurrencyServices,

  ...LanguageServices,

  ...KeywordServices,

  ...VersionServices,

  ...ColorServices,

  ...ActivityServices,

  ...ActivitiesActionServices,

  ...CategoryServices,

  ...CheckoutServices,

  ...CheckoutsCurrencyServices,

  ...ProductServices,

  ...ProductsCategoryServices,

  ...ProductsImageServices,

  ...PriceServices,

  ...ProductsTagServices,

  ...OrderServices,

  ...OrdersItemServices,

  ...OrdersAddressServices,

  ...OrdersSellerServices,

  ...PaymentServices,

  ...PaymentsMethodServices,

  ...CardServices,

  ...CartServices,

  ...CartsItemServices,

  ...PlanServices,

  ...ImageServices,

  ...RatingServices,

  ...CommentServices,

  ...QuestionServices,

  ...AnswerServices,

  ...VideoServices,

  ...VideosTagServices,

  ...VideosAuthorServices,

  ...VideosSubtitleServices,

  ...FileServices,

  ...ModuleServices,

  ...ModulesVideoServices,

  ...ModulesMaterialServices,

  ...VideosMaterialServices,

  ...CourseServices,

  ...CoursesInstructorServices,

  ...CoursesAdminServices,

  ...CoursesStudentServices,

  ...ClassroomServices,

  ...ClassroomsStudentServices,

  ...ClassroomsEnrollmentServices,

  ...ClassroomsAdminServices,

  ...ClassroomsInstructorServices,

  ...ClassroomsPlanServices,

  ...ClassroomsModuleServices,

  ...ClassroomsTagServices,

  ...ClassroomsMaterialServices,

  ...AddressServices,

  ...PhoneServices
];
