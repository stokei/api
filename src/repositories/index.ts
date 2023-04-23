import { AccessesRepositories } from './accesses';
import { AccountsRepositories } from './accounts';
import { AddressesRepositories } from './addresses';
import { AppsRepositories } from './apps';
import { CatalogItemsRepositories } from './catalog-items';
import { CatalogsRepositories } from './catalogs';
import { ColorsRepositories } from './colors';
import { CourseInstructorsRepositories } from './course-instructors';
import { CourseStudentsRepositories } from './course-students';
import { CoursesRepositories } from './courses';
import { CurrenciesRepositories } from './currencies';
import { DomainsRepositories } from './domains';
import { FeaturesRepositories } from './features';
import { FilesRepositories } from './files';
import { HerosRepositories } from './heros';
import { ImagesRepositories } from './images';
import { InvoicesRepositories } from './invoices';
import { LanguagesRepositories } from './languages';
import { ModulesRepositories } from './modules';
import { PaymentMethodsRepositories } from './payment-methods';
import { PhonesRepositories } from './phones';
import { PlansRepositories } from './plans';
import { PriceTiersRepositories } from './price-tiers';
import { PricesRepositories } from './prices';
import { ProductsRepositories } from './products';
import { RecurringsRepositories } from './recurrings';
import { RolesRepositories } from './roles';
import { SortedItemsRepositories } from './sorted-items';
import { SubscriptionContractItemsRepositories } from './subscription-contract-items';
import { SubscriptionContractsRepositories } from './subscription-contracts';
import { UsageRecordsRepositories } from './usage-records';
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
  ...SubscriptionContractsRepositories,
  ...AddressesRepositories,
  ...PhonesRepositories,
  ...InvoicesRepositories,
  ...FilesRepositories,
  ...RecurringsRepositories,
  ...FeaturesRepositories,
  ...PriceTiersRepositories,
  ...SubscriptionContractItemsRepositories,
  ...UsageRecordsRepositories,
  ...CatalogsRepositories,
  ...CatalogItemsRepositories,
  ...RolesRepositories,
  ...HerosRepositories,
  ...SortedItemsRepositories
];
