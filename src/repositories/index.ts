import { AccessesRepositories } from './accesses';
import { AccountsRepositories } from './accounts';
import { AddressesRepositories } from './addresses';
import { AppsRepositories } from './apps';
import { CatalogItemsRepositories } from './catalog-items';
import { CatalogsRepositories } from './catalogs';
import { ColorsRepositories } from './colors';
import { ComponentsRepositories } from './components';
import { CouponsRepositories } from './coupons';
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
import { MaterialsRepositories } from './materials';
import { ModulesRepositories } from './modules';
import { OrderItemsRepositories } from './order-items';
import { OrdersRepositories } from './orders';
import { PagesRepositories } from './pages';
import { PaymentMethodsRepositories } from './payment-methods';
import { PaymentsRepositories } from './payments';
import { PhonesRepositories } from './phones';
import { PlansRepositories } from './plans';
import { PluginsRepositories } from './plugins';
import { PriceTiersRepositories } from './price-tiers';
import { PricesRepositories } from './prices';
import { ProductComboItemsRepositories } from './product-combo-items';
import { ProductsRepositories } from './products';
import { RecurringsRepositories } from './recurrings';
import { RolesRepositories } from './roles';
import { SitesRepositories } from './sites';
import { SortedItemsRepositories } from './sorted-items';
import { SubscriptionContractItemsRepositories } from './subscription-contract-items';
import { SubscriptionContractsRepositories } from './subscription-contracts';
import { UsageRecordsRepositories } from './usage-records';
import { VersionsRepositories } from './versions';
import { VideoAuthorsRepositories } from './video-authors';
import { VideoViewsRepositories } from './video-views';
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
  ...SortedItemsRepositories,
  ...VideoViewsRepositories,
  ...MaterialsRepositories,
  ...OrdersRepositories,
  ...OrderItemsRepositories,
  ...PaymentsRepositories,
  ...ComponentsRepositories,
  ...PagesRepositories,
  ...SitesRepositories,
  ...VersionsRepositories,
  ...CouponsRepositories,
  ...PluginsRepositories,
  ...ProductComboItemsRepositories
];
