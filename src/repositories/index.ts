import { AccessesRepositories } from './accesses';
import { AccountsRepositories } from './accounts';
import { ActivitiesRepositories } from './activities';
import { ActivitiesActionsRepositories } from './activities-actions';
import { AddressesRepositories } from './addresses';
import { AnswersRepositories } from './answers';
import { CardsRepositories } from './cards';
import { CartsRepositories } from './carts';
import { CartsItemsRepositories } from './carts-items';
import { CategoriesRepositories } from './categories';
import { CheckoutsRepositories } from './checkouts';
import { CheckoutsCurrenciesRepositories } from './checkouts-currencies';
import { ClassroomsRepositories } from './classrooms';
import { ClassroomsAdminsRepositories } from './classrooms-admins';
import { ClassroomsEnrollmentsRepositories } from './classrooms-enrollments';
import { ClassroomsInstructorsRepositories } from './classrooms-instructors';
import { ClassroomsMaterialsRepositories } from './classrooms-materials';
import { ClassroomsModulesRepositories } from './classrooms-modules';
import { ClassroomsPlansRepositories } from './classrooms-plans';
import { ClassroomsStudentsRepositories } from './classrooms-students';
import { ClassroomsTagsRepositories } from './classrooms-tags';
import { ColorsRepositories } from './colors';
import { CommentsRepositories } from './comments';
import { CoursesRepositories } from './courses';
import { CoursesAdminsRepositories } from './courses-admins';
import { CoursesInstructorsRepositories } from './courses-instructors';
import { CoursesStudentsRepositories } from './courses-students';
import { CurrenciesRepositories } from './currencies';
import { DomainsRepositories } from './domains';
import { FilesRepositories } from './files';
import { ImagesRepositories } from './images';
import { KeywordsRepositories } from './keywords';
import { LanguagesRepositories } from './languages';
import { MetatagsRepositories } from './metatags';
import { ModulesRepositories } from './modules';
import { ModulesMaterialsRepositories } from './modules-materials';
import { ModulesVideosRepositories } from './modules-videos';
import { OrdersRepositories } from './orders';
import { OrdersAddressesRepositories } from './orders-addresses';
import { OrdersItemsRepositories } from './orders-items';
import { OrdersSellersRepositories } from './orders-sellers';
import { PagesRepositories } from './pages';
import { PaymentsRepositories } from './payments';
import { PaymentsMethodsRepositories } from './payments-methods';
import { PhonesRepositories } from './phones';
import { PlansRepositories } from './plans';
import { PricesRepositories } from './prices';
import { ProductsRepositories } from './products';
import { ProductsCategoriesRepositories } from './products-categories';
import { ProductsImagesRepositories } from './products-images';
import { ProductsTagsRepositories } from './products-tags';
import { ProjectsRepositories } from './projects';
import { ProjectsMembersRepositories } from './projects-members';
import { ProjectsPlansRepositories } from './projects-plans';
import { QuestionsRepositories } from './questions';
import { RatingsRepositories } from './ratings';
import { SitesRepositories } from './sites';
import { SitesDarkColorsRepositories } from './sites-dark-colors';
import { SitesLightColorsRepositories } from './sites-light-colors';
import { TagsRepositories } from './tags';
import { VersionsRepositories } from './versions';
import { VideosRepositories } from './videos';
import { VideosAuthorsRepositories } from './videos-authors';
import { VideosMaterialsRepositories } from './videos-materials';
import { VideosSubtitlesRepositories } from './videos-subtitles';
import { VideosTagsRepositories } from './videos-tags';

export const Repositories = [
  ...AccountsRepositories,
  ...AccessesRepositories,
  ...ProjectsRepositories,

  ...ProjectsMembersRepositories,

  ...ProjectsPlansRepositories,

  ...SitesRepositories,

  ...SitesLightColorsRepositories,

  ...SitesDarkColorsRepositories,

  ...DomainsRepositories,

  ...PagesRepositories,

  ...MetatagsRepositories,

  ...TagsRepositories,

  ...CurrenciesRepositories,

  ...LanguagesRepositories,

  ...KeywordsRepositories,

  ...VersionsRepositories,

  ...ColorsRepositories,

  ...ActivitiesRepositories,

  ...ActivitiesActionsRepositories,

  ...CategoriesRepositories,

  ...CheckoutsRepositories,

  ...CheckoutsCurrenciesRepositories,

  ...ProductsRepositories,

  ...ProductsCategoriesRepositories,

  ...ProductsImagesRepositories,

  ...PricesRepositories,

  ...ProductsTagsRepositories,

  ...OrdersRepositories,

  ...OrdersItemsRepositories,

  ...OrdersAddressesRepositories,

  ...OrdersSellersRepositories,

  ...PaymentsRepositories,

  ...PaymentsMethodsRepositories,

  ...CardsRepositories,

  ...CartsRepositories,

  ...CartsItemsRepositories,

  ...PlansRepositories,

  ...ImagesRepositories,

  ...RatingsRepositories,

  ...CommentsRepositories,

  ...QuestionsRepositories,

  ...AnswersRepositories,

  ...VideosRepositories,

  ...VideosTagsRepositories,

  ...VideosAuthorsRepositories,

  ...VideosSubtitlesRepositories,

  ...FilesRepositories,

  ...ModulesRepositories,

  ...ModulesVideosRepositories,

  ...ModulesMaterialsRepositories,

  ...VideosMaterialsRepositories,

  ...CoursesRepositories,

  ...CoursesInstructorsRepositories,

  ...CoursesAdminsRepositories,

  ...CoursesStudentsRepositories,

  ...ClassroomsRepositories,

  ...ClassroomsStudentsRepositories,

  ...ClassroomsEnrollmentsRepositories,

  ...ClassroomsAdminsRepositories,

  ...ClassroomsInstructorsRepositories,

  ...ClassroomsPlansRepositories,

  ...ClassroomsModulesRepositories,

  ...ClassroomsTagsRepositories,

  ...ClassroomsMaterialsRepositories,

  ...AddressesRepositories,

  ...PhonesRepositories
];
