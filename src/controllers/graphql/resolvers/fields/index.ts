import { AccessesFieldsResolvers } from './accesses';
import { AccountsFieldsResolvers } from './accounts';
import { AddressesFieldsResolvers } from './addresses';
import { CardsFieldsResolvers } from './cards';
import { CartsFieldsResolvers } from './carts';
import { CartsItemsFieldsResolvers } from './carts-items';
import { ClassroomsFieldsResolvers } from './classrooms';
import { ClassroomInstructorsFieldsResolvers } from './classroom-instructors';
import { ClassroomModulesFieldsResolvers } from './classroom-module s';
import { ClassroomStudentsFieldsResolvers } from './classroom-students';
import { ColorsFieldsResolvers } from './colors';
import { CoursesFieldsResolvers } from './courses';
import { CourseInstructorsFieldsResolvers } from './course-instructors';
import { CourseStudentsFieldsResolvers } from './course-students';
import { CurrenciesFieldsResolvers } from './currencies';
import { DomainsFieldsResolvers } from './domains';
import { ImagesFieldsResolvers } from './images';
import { LanguagesFieldsResolvers } from './languages';
import { ModulesFieldsResolvers } from './modules';
import { ModuleVideosFieldsResolvers } from './module-videos';
import { OrdersFieldsResolvers } from './orders';
import { PaymentsFieldsResolvers } from './payments';
import { PaymentMethodsFieldsResolvers } from './payment-methods';
import { PhonesFieldsResolvers } from './phones';
import { PlansFieldsResolvers } from './plans';
import { PricesFieldsResolvers } from './prices';
import { ProductsFieldsResolvers } from './products';
import { ProjectsFieldsResolvers } from './projects';
import { SubscriptionsFieldsResolvers } from './subscriptions';
import { VideosFieldsResolvers } from './videos';
import { VideosAuthorsFieldsResolvers } from './videos-authors';

export const FieldsResolvers = [
  ...AccountsFieldsResolvers,
  ...AccessesFieldsResolvers,
  ...ProjectsFieldsResolvers,
  ...DomainsFieldsResolvers,
  ...CurrenciesFieldsResolvers,
  ...LanguagesFieldsResolvers,
  ...ColorsFieldsResolvers,
  ...ProductsFieldsResolvers,
  ...PricesFieldsResolvers,
  ...OrdersFieldsResolvers,
  ...PaymentsFieldsResolvers,
  ...PaymentMethodsFieldsResolvers,
  ...CardsFieldsResolvers,
  ...CartsFieldsResolvers,
  ...CartsItemsFieldsResolvers,
  ...PlansFieldsResolvers,
  ...ImagesFieldsResolvers,
  ...VideosFieldsResolvers,
  ...VideosAuthorsFieldsResolvers,
  ...ModulesFieldsResolvers,
  ...ModuleVideosFieldsResolvers,
  ...CoursesFieldsResolvers,
  ...CourseInstructorsFieldsResolvers,
  ...CourseStudentsFieldsResolvers,
  ...ClassroomsFieldsResolvers,
  ...ClassroomStudentsFieldsResolvers,
  ...SubscriptionsFieldsResolvers,
  ...ClassroomInstructorsFieldsResolvers,
  ...ClassroomModulesFieldsResolvers,
  ...AddressesFieldsResolvers,
  ...PhonesFieldsResolvers
];
