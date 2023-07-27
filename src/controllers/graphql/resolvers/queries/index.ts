import { AccessesQueries } from './accesses';
import { AccountsQueries } from './accounts';
import { AddressesQueries } from './addresses';
import { AppsQueries } from './apps';
import { BillingQueries } from './billing';
import { CatalogItemsQueries } from './catalog-items';
import { CatalogsQueries } from './catalogs';
import { ColorsQueries } from './colors';
import { CourseInstructorsQueries } from './course-instructors';
import { CourseStudentsQueries } from './course-students';
import { CoursesQueries } from './courses';
import { CurrenciesQueries } from './currencies';
import { DomainsQueries } from './domains';
import { FeaturesQueries } from './features';
import { HerosQueries } from './heros';
import { ImagesQueries } from './images';
import { InvoicesQueries } from './invoices';
import { LanguagesQueries } from './languages';
import { MaterialsQueries } from './materials';
import { ModulesQueries } from './modules';
import { PaymentMethodsQueries } from './payment-methods';
import { PhonesQueries } from './phones';
import { PlansQueries } from './plans';
import { PricesQueries } from './prices';
import { ProductsQueries } from './products';
import { SortedItemsQueries } from './sorted-items';
import { SubscriptionContractItemsQueries } from './subscription-contract-items';
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
  ...SubscriptionContractsQueries,
  ...AddressesQueries,
  ...PhonesQueries,
  ...InvoicesQueries,
  ...FeaturesQueries,
  ...CatalogsQueries,
  ...CatalogItemsQueries,
  ...HerosQueries,
  ...SortedItemsQueries,
  ...MaterialsQueries,
  ...SubscriptionContractItemsQueries,
  ...BillingQueries
];
