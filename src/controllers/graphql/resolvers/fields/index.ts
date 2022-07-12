import { AccessesFieldsResolvers } from './accesses';
import { AccountsFieldsResolvers } from './accounts';
import { AddressesFieldsResolvers } from './addresses';
import { CartsFieldsResolvers } from './carts';
import { CartItemsFieldsResolvers } from './cart-items';
import { ClassroomInstructorsFieldsResolvers } from './classroom-instructors';
import { ClassroomModulesFieldsResolvers } from './classroom-modules';
import { ClassroomStudentsFieldsResolvers } from './classroom-students';
import { ClassroomsFieldsResolvers } from './classrooms';
import { ColorsFieldsResolvers } from './colors';
import { CourseInstructorsFieldsResolvers } from './course-instructors';
import { CourseStudentsFieldsResolvers } from './course-students';
import { CoursesFieldsResolvers } from './courses';
import { CurrenciesFieldsResolvers } from './currencies';
import { DomainsFieldsResolvers } from './domains';
import { ImagesFieldsResolvers } from './images';
import { LanguagesFieldsResolvers } from './languages';
import { ModuleVideosFieldsResolvers } from './module-videos';
import { ModulesFieldsResolvers } from './modules';
import { OrdersFieldsResolvers } from './orders';
import { PaymentMethodsFieldsResolvers } from './payment-methods';
import { PaymentsFieldsResolvers } from './payments';
import { PhonesFieldsResolvers } from './phones';
import { PlansFieldsResolvers } from './plans';
import { PricesFieldsResolvers } from './prices';
import { ProductsFieldsResolvers } from './products';
import { ProjectsFieldsResolvers } from './projects';
import { SubscriptionsFieldsResolvers } from './subscriptions';
import { VideoAuthorsFieldsResolvers } from './video-authors';
import { VideosFieldsResolvers } from './videos';

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
  ...CartsFieldsResolvers,
  ...CartItemsFieldsResolvers,
  ...PlansFieldsResolvers,
  ...ImagesFieldsResolvers,
  ...VideosFieldsResolvers,
  ...VideoAuthorsFieldsResolvers,
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
