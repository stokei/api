import { AccessesFieldsResolvers } from './accesses';
import { AccountsFieldsResolvers } from './accounts';
import { AddressesFieldsResolvers } from './addresses';
import { CardsFieldsResolvers } from './cards';
import { CartsFieldsResolvers } from './carts';
import { CartsItemsFieldsResolvers } from './carts-items';
import { ClassroomsFieldsResolvers } from './classrooms';
import { ClassroomsEnrollmentsFieldsResolvers } from './classrooms-enrollments';
import { ClassroomsInstructorsFieldsResolvers } from './classrooms-instructors';
import { ClassroomsModulesFieldsResolvers } from './classrooms-modules';
import { ClassroomsStudentsFieldsResolvers } from './classrooms-students';
import { ColorsFieldsResolvers } from './colors';
import { CoursesFieldsResolvers } from './courses';
import { CoursesInstructorsFieldsResolvers } from './courses-instructors';
import { CoursesStudentsFieldsResolvers } from './courses-students';
import { CurrenciesFieldsResolvers } from './currencies';
import { DomainsFieldsResolvers } from './domains';
import { ImagesFieldsResolvers } from './images';
import { LanguagesFieldsResolvers } from './languages';
import { ModulesFieldsResolvers } from './modules';
import { ModulesVideosFieldsResolvers } from './modules-videos';
import { OrdersFieldsResolvers } from './orders';
import { PaymentsFieldsResolvers } from './payments';
import { PaymentsMethodsFieldsResolvers } from './payments-methods';
import { PhonesFieldsResolvers } from './phones';
import { PlansFieldsResolvers } from './plans';
import { PricesFieldsResolvers } from './prices';
import { ProductsFieldsResolvers } from './products';
import { ProjectsFieldsResolvers } from './projects';
import { ProjectsMembersFieldsResolvers } from './projects-members';
import { SitesFieldsResolvers } from './sites';
import { VideosFieldsResolvers } from './videos';
import { VideosAuthorsFieldsResolvers } from './videos-authors';

export const FieldsResolvers = [
  ...AccountsFieldsResolvers,
  ...AccessesFieldsResolvers,
  ...ProjectsFieldsResolvers,
  ...ProjectsMembersFieldsResolvers,
  ...SitesFieldsResolvers,
  ...DomainsFieldsResolvers,
  ...CurrenciesFieldsResolvers,
  ...LanguagesFieldsResolvers,
  ...ColorsFieldsResolvers,
  ...ProductsFieldsResolvers,
  ...PricesFieldsResolvers,
  ...OrdersFieldsResolvers,
  ...PaymentsFieldsResolvers,
  ...PaymentsMethodsFieldsResolvers,
  ...CardsFieldsResolvers,
  ...CartsFieldsResolvers,
  ...CartsItemsFieldsResolvers,
  ...PlansFieldsResolvers,
  ...ImagesFieldsResolvers,
  ...VideosFieldsResolvers,
  ...VideosAuthorsFieldsResolvers,
  ...ModulesFieldsResolvers,
  ...ModulesVideosFieldsResolvers,
  ...CoursesFieldsResolvers,
  ...CoursesInstructorsFieldsResolvers,
  ...CoursesStudentsFieldsResolvers,
  ...ClassroomsFieldsResolvers,
  ...ClassroomsStudentsFieldsResolvers,
  ...ClassroomsEnrollmentsFieldsResolvers,
  ...ClassroomsInstructorsFieldsResolvers,
  ...ClassroomsModulesFieldsResolvers,
  ...AddressesFieldsResolvers,
  ...PhonesFieldsResolvers
];
