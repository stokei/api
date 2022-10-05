import { AccessesRepositories } from './accesses';
import { AccountsRepositories } from './accounts';
import { AddressesRepositories } from './addresses';
import { AppsRepositories } from './apps';
import { ClassroomInstructorsRepositories } from './classroom-instructors';
import { ClassroomModulesRepositories } from './classroom-modules';
import { ClassroomStudentsRepositories } from './classroom-students';
import { ClassroomsRepositories } from './classrooms';
import { ColorsRepositories } from './colors';
import { CourseInstructorsRepositories } from './course-instructors';
import { CourseStudentsRepositories } from './course-students';
import { CoursesRepositories } from './courses';
import { CurrenciesRepositories } from './currencies';
import { DomainsRepositories } from './domains';
import { FilesRepositories } from './files';
import { ImagesRepositories } from './images';
import { InvoicesRepositories } from './invoices';
import { LanguagesRepositories } from './languages';
import { ModulesRepositories } from './modules';
import { PaymentMethodsRepositories } from './payment-methods';
import { PhonesRepositories } from './phones';
import { PlansRepositories } from './plans';
import { PricesRepositories } from './prices';
import { ProductsRepositories } from './products';
import { SubscriptionContractsRepositories } from './subscription-contracts';
import { VideoAuthorsRepositories } from './video-authors';
import { VideosRepositories } from './videos';

export const Repositories = [
  ...AccountsRepositories,
  ...AccessesRepositories,
  ...AppsRepositories,
  ...DomainsRepositories,
  ...CurrenciesRepositories,
  ...LanguagesRepositories,
  ...ColorsRepositories,
  ...ProductsRepositories,
  ...PricesRepositories,
  ...PaymentMethodsRepositories,
  ...PlansRepositories,
  ...ImagesRepositories,
  ...VideosRepositories,
  ...VideoAuthorsRepositories,
  ...ModulesRepositories,
  ...CoursesRepositories,
  ...CourseInstructorsRepositories,
  ...CourseStudentsRepositories,
  ...ClassroomsRepositories,
  ...ClassroomStudentsRepositories,
  ...SubscriptionContractsRepositories,
  ...ClassroomInstructorsRepositories,
  ...ClassroomModulesRepositories,
  ...AddressesRepositories,
  ...PhonesRepositories,
  ...InvoicesRepositories,
  ...FilesRepositories
];
