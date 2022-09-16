import { AccessesQueries } from './accesses';
import { AccountsQueries } from './accounts';
import { AddressesQueries } from './addresses';
import { AppsQueries } from './apps';
import { ClassroomInstructorsQueries } from './classroom-instructors';
import { ClassroomModulesQueries } from './classroom-modules';
import { ClassroomStudentsQueries } from './classroom-students';
import { ClassroomsQueries } from './classrooms';
import { ColorsQueries } from './colors';
import { CourseInstructorsQueries } from './course-instructors';
import { CourseStudentsQueries } from './course-students';
import { CoursesQueries } from './courses';
import { CurrenciesQueries } from './currencies';
import { DomainsQueries } from './domains';
import { ImagesQueries } from './images';
import { InvoicesQueries } from './invoices';
import { LanguagesQueries } from './languages';
import { ModulesQueries } from './modules';
import { PaymentMethodsQueries } from './payment-methods';
import { PhonesQueries } from './phones';
import { PlansQueries } from './plans';
import { PricesQueries } from './prices';
import { ProductsQueries } from './products';
import { SubscriptionContractsQueries } from './subscription-contracts';
import { VideoAuthorsQueries } from './video-authors';
import { VideosQueries } from './videos';

export const Queries = [
  ...AccountsQueries,
  ...AccessesQueries,
  ...AppsQueries,
  ...DomainsQueries,
  ...CurrenciesQueries,
  ...LanguagesQueries,
  ...ColorsQueries,
  ...ProductsQueries,
  ...PricesQueries,
  ...PaymentMethodsQueries,
  ...PlansQueries,
  ...ImagesQueries,
  ...VideosQueries,
  ...VideoAuthorsQueries,
  ...ModulesQueries,
  ...CoursesQueries,
  ...CourseInstructorsQueries,
  ...CourseStudentsQueries,
  ...ClassroomsQueries,
  ...ClassroomStudentsQueries,
  ...SubscriptionContractsQueries,
  ...ClassroomInstructorsQueries,
  ...ClassroomModulesQueries,
  ...AddressesQueries,
  ...PhonesQueries,
  ...InvoicesQueries
];
