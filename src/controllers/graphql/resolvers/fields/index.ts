import { AccountsFieldsResolvers } from './accounts';

import { AccessesFieldsResolvers } from './accesses';

import { ProjectsFieldsResolvers } from './projects';

import { ProjectsMembersFieldsResolvers } from './projects-members';

import { ProjectsPlansFieldsResolvers } from './projects-plans';

import { SitesFieldsResolvers } from './sites';

import { SitesLightColorsFieldsResolvers } from './sites-light-colors';

import { SitesDarkColorsFieldsResolvers } from './sites-dark-colors';

import { DomainsFieldsResolvers } from './domains';

import { PagesFieldsResolvers } from './pages';

import { MetatagsFieldsResolvers } from './metatags';

import { TagsFieldsResolvers } from './tags';

import { CurrenciesFieldsResolvers } from './currencies';

import { LanguagesFieldsResolvers } from './languages';

import { KeywordsFieldsResolvers } from './keywords';

import { VersionsFieldsResolvers } from './versions';

import { ColorsFieldsResolvers } from './colors';

import { ActivitiesFieldsResolvers } from './activities';

import { ActivitiesActionsFieldsResolvers } from './activities-actions';

import { CategoriesFieldsResolvers } from './categories';

import { CheckoutsFieldsResolvers } from './checkouts';

import { CheckoutsCurrenciesFieldsResolvers } from './checkouts-currencies';

import { ProductsFieldsResolvers } from './products';

import { ProductsCategoriesFieldsResolvers } from './products-categories';

import { ProductsImagesFieldsResolvers } from './products-images';

import { PricesFieldsResolvers } from './prices';

import { ProductsTagsFieldsResolvers } from './products-tags';

import { OrdersFieldsResolvers } from './orders';

import { OrdersItemsFieldsResolvers } from './orders-items';

import { OrdersAddressesFieldsResolvers } from './orders-addresses';

import { OrdersSellersFieldsResolvers } from './orders-sellers';

import { PaymentsFieldsResolvers } from './payments';

import { PaymentsMethodsFieldsResolvers } from './payments-methods';

import { CardsFieldsResolvers } from './cards';

import { CartsFieldsResolvers } from './carts';

import { CartsItemsFieldsResolvers } from './carts-items';

import { PlansFieldsResolvers } from './plans';

import { ImagesFieldsResolvers } from './images';

import { RatingsFieldsResolvers } from './ratings';

import { CommentsFieldsResolvers } from './comments';

import { QuestionsFieldsResolvers } from './questions';

import { AnswersFieldsResolvers } from './answers';

import { VideosFieldsResolvers } from './videos';

import { VideosTagsFieldsResolvers } from './videos-tags';

import { VideosAuthorsFieldsResolvers } from './videos-authors';

import { VideosSubtitlesFieldsResolvers } from './videos-subtitles';

import { FilesFieldsResolvers } from './files';

import { ModulesFieldsResolvers } from './modules';

import { ModulesVideosFieldsResolvers } from './modules-videos';

import { ModulesMaterialsFieldsResolvers } from './modules-materials';

import { VideosMaterialsFieldsResolvers } from './videos-materials';

import { CoursesFieldsResolvers } from './courses';

import { CoursesInstructorsFieldsResolvers } from './courses-instructors';

import { CoursesAdminsFieldsResolvers } from './courses-admins';

import { CoursesStudentsFieldsResolvers } from './courses-students';

import { ClassroomsFieldsResolvers } from './classrooms';

import { ClassroomsStudentsFieldsResolvers } from './classrooms-students';

import { ClassroomsEnrollmentsFieldsResolvers } from './classrooms-enrollments';

import { ClassroomsAdminsFieldsResolvers } from './classrooms-admins';

import { ClassroomsInstructorsFieldsResolvers } from './classrooms-instructors';

import { ClassroomsPlansFieldsResolvers } from './classrooms-plans';

import { ClassroomsModulesFieldsResolvers } from './classrooms-modules';

import { ClassroomsTagsFieldsResolvers } from './classrooms-tags';

import { ClassroomsMaterialsFieldsResolvers } from './classrooms-materials';

import { AddressesFieldsResolvers } from './addresses';

import { PhonesFieldsResolvers } from './phones';

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
