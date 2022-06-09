import { AccessesQueries } from './accesses';
import { AccountsQueries } from './accounts';
import { ActivitiesQueries } from './activities';
import { ActivitiesActionsQueries } from './activities-actions';
import { AddressesQueries } from './addresses';
import { AnswersQueries } from './answers';
import { CardsQueries } from './cards';
import { CartsQueries } from './carts';
import { CartsItemsQueries } from './carts-items';
import { CategoriesQueries } from './categories';
import { CheckoutsQueries } from './checkouts';
import { CheckoutsCurrenciesQueries } from './checkouts-currencies';
import { ClassroomsQueries } from './classrooms';
import { ClassroomsAdminsQueries } from './classrooms-admins';
import { ClassroomsEnrollmentsQueries } from './classrooms-enrollments';
import { ClassroomsInstructorsQueries } from './classrooms-instructors';
import { ClassroomsMaterialsQueries } from './classrooms-materials';
import { ClassroomsModulesQueries } from './classrooms-modules';
import { ClassroomsPlansQueries } from './classrooms-plans';
import { ClassroomsStudentsQueries } from './classrooms-students';
import { ClassroomsTagsQueries } from './classrooms-tags';
import { ColorsQueries } from './colors';
import { CommentsQueries } from './comments';
import { CoursesQueries } from './courses';
import { CoursesAdminsQueries } from './courses-admins';
import { CoursesInstructorsQueries } from './courses-instructors';
import { CoursesStudentsQueries } from './courses-students';
import { CurrenciesQueries } from './currencies';
import { DomainsQueries } from './domains';
import { FilesQueries } from './files';
import { ImagesQueries } from './images';
import { KeywordsQueries } from './keywords';
import { LanguagesQueries } from './languages';
import { MetatagsQueries } from './metatags';
import { ModulesQueries } from './modules';
import { ModulesMaterialsQueries } from './modules-materials';
import { ModulesVideosQueries } from './modules-videos';
import { OrdersQueries } from './orders';
import { OrdersAddressesQueries } from './orders-addresses';
import { OrdersItemsQueries } from './orders-items';
import { OrdersSellersQueries } from './orders-sellers';
import { PagesQueries } from './pages';
import { PaymentsQueries } from './payments';
import { PaymentsMethodsQueries } from './payments-methods';
import { PhonesQueries } from './phones';
import { PlansQueries } from './plans';
import { PricesQueries } from './prices';
import { ProductsQueries } from './products';
import { ProductsCategoriesQueries } from './products-categories';
import { ProductsImagesQueries } from './products-images';
import { ProductsTagsQueries } from './products-tags';
import { ProjectsQueries } from './projects';
import { ProjectsMembersQueries } from './projects-members';
import { ProjectsPlansQueries } from './projects-plans';
import { QuestionsQueries } from './questions';
import { RatingsQueries } from './ratings';
import { SitesQueries } from './sites';
import { SitesDarkColorsQueries } from './sites-dark-colors';
import { SitesLightColorsQueries } from './sites-light-colors';
import { TagsQueries } from './tags';
import { VersionsQueries } from './versions';
import { VideosQueries } from './videos';
import { VideosAuthorsQueries } from './videos-authors';
import { VideosMaterialsQueries } from './videos-materials';
import { VideosSubtitlesQueries } from './videos-subtitles';
import { VideosTagsQueries } from './videos-tags';

export const Queries = [
  ...AccountsQueries,
  ...AccessesQueries,
  ...ProjectsQueries,

  ...ProjectsMembersQueries,

  ...ProjectsPlansQueries,

  ...SitesQueries,

  ...SitesLightColorsQueries,

  ...SitesDarkColorsQueries,

  ...DomainsQueries,

  ...PagesQueries,

  ...MetatagsQueries,

  ...TagsQueries,

  ...CurrenciesQueries,

  ...LanguagesQueries,

  ...KeywordsQueries,

  ...VersionsQueries,

  ...ColorsQueries,

  ...ActivitiesQueries,

  ...ActivitiesActionsQueries,

  ...CategoriesQueries,

  ...CheckoutsQueries,

  ...CheckoutsCurrenciesQueries,

  ...ProductsQueries,

  ...ProductsCategoriesQueries,

  ...ProductsImagesQueries,

  ...PricesQueries,

  ...ProductsTagsQueries,

  ...OrdersQueries,

  ...OrdersItemsQueries,

  ...OrdersAddressesQueries,

  ...OrdersSellersQueries,

  ...PaymentsQueries,

  ...PaymentsMethodsQueries,

  ...CardsQueries,

  ...CartsQueries,

  ...CartsItemsQueries,

  ...PlansQueries,

  ...ImagesQueries,

  ...RatingsQueries,

  ...CommentsQueries,

  ...QuestionsQueries,

  ...AnswersQueries,

  ...VideosQueries,

  ...VideosTagsQueries,

  ...VideosAuthorsQueries,

  ...VideosSubtitlesQueries,

  ...FilesQueries,

  ...ModulesQueries,

  ...ModulesVideosQueries,

  ...ModulesMaterialsQueries,

  ...VideosMaterialsQueries,

  ...CoursesQueries,

  ...CoursesInstructorsQueries,

  ...CoursesAdminsQueries,

  ...CoursesStudentsQueries,

  ...ClassroomsQueries,

  ...ClassroomsStudentsQueries,

  ...ClassroomsEnrollmentsQueries,

  ...ClassroomsAdminsQueries,

  ...ClassroomsInstructorsQueries,

  ...ClassroomsPlansQueries,

  ...ClassroomsModulesQueries,

  ...ClassroomsTagsQueries,

  ...ClassroomsMaterialsQueries,

  ...AddressesQueries,

  ...PhonesQueries
];
