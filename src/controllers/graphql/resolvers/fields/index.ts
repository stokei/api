import { AccessesFieldsResolvers } from './accesses';
import { AccountsFieldsResolvers } from './accounts';
import { ActivitiesFieldsResolvers } from './activities';
import { ActivitiesActionsFieldsResolvers } from './activities-actions';
import { AddressesFieldsResolvers } from './addresses';
import { AnswersFieldsResolvers } from './answers';
import { CardsFieldsResolvers } from './cards';
import { CartsFieldsResolvers } from './carts';
import { CartsItemsFieldsResolvers } from './carts-items';
import { CategoriesFieldsResolvers } from './categories';
import { CheckoutsFieldsResolvers } from './checkouts';
import { CheckoutsCurrenciesFieldsResolvers } from './checkouts-currencies';
import { ClassroomsFieldsResolvers } from './classrooms';
import { ClassroomsAdminsFieldsResolvers } from './classrooms-admins';
import { ClassroomsEnrollmentsFieldsResolvers } from './classrooms-enrollments';
import { ClassroomsInstructorsFieldsResolvers } from './classrooms-instructors';
import { ClassroomsMaterialsFieldsResolvers } from './classrooms-materials';
import { ClassroomsModulesFieldsResolvers } from './classrooms-modules';
import { ClassroomsPlansFieldsResolvers } from './classrooms-plans';
import { ClassroomsStudentsFieldsResolvers } from './classrooms-students';
import { ClassroomsTagsFieldsResolvers } from './classrooms-tags';
import { ColorsFieldsResolvers } from './colors';
import { CommentsFieldsResolvers } from './comments';
import { CoursesFieldsResolvers } from './courses';
import { CoursesAdminsFieldsResolvers } from './courses-admins';
import { CoursesInstructorsFieldsResolvers } from './courses-instructors';
import { CoursesStudentsFieldsResolvers } from './courses-students';
import { CurrenciesFieldsResolvers } from './currencies';
import { DomainsFieldsResolvers } from './domains';
import { FilesFieldsResolvers } from './files';
import { ImagesFieldsResolvers } from './images';
import { KeywordsFieldsResolvers } from './keywords';
import { LanguagesFieldsResolvers } from './languages';
import { MetatagsFieldsResolvers } from './metatags';
import { ModulesFieldsResolvers } from './modules';
import { ModulesMaterialsFieldsResolvers } from './modules-materials';
import { ModulesVideosFieldsResolvers } from './modules-videos';
import { OrdersFieldsResolvers } from './orders';
import { OrdersAddressesFieldsResolvers } from './orders-addresses';
import { OrdersItemsFieldsResolvers } from './orders-items';
import { OrdersSellersFieldsResolvers } from './orders-sellers';
import { PagesFieldsResolvers } from './pages';
import { PaymentsFieldsResolvers } from './payments';
import { PaymentsMethodsFieldsResolvers } from './payments-methods';
import { PhonesFieldsResolvers } from './phones';
import { PlansFieldsResolvers } from './plans';
import { PricesFieldsResolvers } from './prices';
import { ProductsFieldsResolvers } from './products';
import { ProductsCategoriesFieldsResolvers } from './products-categories';
import { ProductsImagesFieldsResolvers } from './products-images';
import { ProductsTagsFieldsResolvers } from './products-tags';
import { ProjectsFieldsResolvers } from './projects';
import { ProjectsMembersFieldsResolvers } from './projects-members';
import { ProjectsPlansFieldsResolvers } from './projects-plans';
import { QuestionsFieldsResolvers } from './questions';
import { RatingsFieldsResolvers } from './ratings';
import { SitesFieldsResolvers } from './sites';
import { SitesDarkColorsFieldsResolvers } from './sites-dark-colors';
import { SitesLightColorsFieldsResolvers } from './sites-light-colors';
import { TagsFieldsResolvers } from './tags';
import { VersionsFieldsResolvers } from './versions';
import { VideosFieldsResolvers } from './videos';
import { VideosAuthorsFieldsResolvers } from './videos-authors';
import { VideosMaterialsFieldsResolvers } from './videos-materials';
import { VideosSubtitlesFieldsResolvers } from './videos-subtitles';
import { VideosTagsFieldsResolvers } from './videos-tags';

export const FieldsResolvers = [
  ...AccountsFieldsResolvers,

  ...AccessesFieldsResolvers,
  ...ProjectsFieldsResolvers,

  ...ProjectsMembersFieldsResolvers,

  ...ProjectsPlansFieldsResolvers,

  ...SitesFieldsResolvers,

  ...SitesLightColorsFieldsResolvers,

  ...SitesDarkColorsFieldsResolvers,

  ...DomainsFieldsResolvers,

  ...PagesFieldsResolvers,

  ...MetatagsFieldsResolvers,

  ...TagsFieldsResolvers,

  ...CurrenciesFieldsResolvers,

  ...LanguagesFieldsResolvers,

  ...KeywordsFieldsResolvers,

  ...VersionsFieldsResolvers,

  ...ColorsFieldsResolvers,

  ...ActivitiesFieldsResolvers,

  ...ActivitiesActionsFieldsResolvers,

  ...CategoriesFieldsResolvers,

  ...CheckoutsFieldsResolvers,

  ...CheckoutsCurrenciesFieldsResolvers,

  ...ProductsFieldsResolvers,

  ...ProductsCategoriesFieldsResolvers,

  ...ProductsImagesFieldsResolvers,

  ...PricesFieldsResolvers,

  ...ProductsTagsFieldsResolvers,

  ...OrdersFieldsResolvers,

  ...OrdersItemsFieldsResolvers,

  ...OrdersAddressesFieldsResolvers,

  ...OrdersSellersFieldsResolvers,

  ...PaymentsFieldsResolvers,

  ...PaymentsMethodsFieldsResolvers,

  ...CardsFieldsResolvers,

  ...CartsFieldsResolvers,

  ...CartsItemsFieldsResolvers,

  ...PlansFieldsResolvers,

  ...ImagesFieldsResolvers,

  ...RatingsFieldsResolvers,

  ...CommentsFieldsResolvers,

  ...QuestionsFieldsResolvers,

  ...AnswersFieldsResolvers,

  ...VideosFieldsResolvers,

  ...VideosTagsFieldsResolvers,

  ...VideosAuthorsFieldsResolvers,

  ...VideosSubtitlesFieldsResolvers,

  ...FilesFieldsResolvers,

  ...ModulesFieldsResolvers,

  ...ModulesVideosFieldsResolvers,

  ...ModulesMaterialsFieldsResolvers,

  ...VideosMaterialsFieldsResolvers,

  ...CoursesFieldsResolvers,

  ...CoursesInstructorsFieldsResolvers,

  ...CoursesAdminsFieldsResolvers,

  ...CoursesStudentsFieldsResolvers,

  ...ClassroomsFieldsResolvers,

  ...ClassroomsStudentsFieldsResolvers,

  ...ClassroomsEnrollmentsFieldsResolvers,

  ...ClassroomsAdminsFieldsResolvers,

  ...ClassroomsInstructorsFieldsResolvers,

  ...ClassroomsPlansFieldsResolvers,

  ...ClassroomsModulesFieldsResolvers,

  ...ClassroomsTagsFieldsResolvers,

  ...ClassroomsMaterialsFieldsResolvers,

  ...AddressesFieldsResolvers,

  ...PhonesFieldsResolvers
];
