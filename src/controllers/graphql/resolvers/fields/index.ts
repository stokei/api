import { AccessesFieldsResolvers } from './accesses';
import { AccountsFieldsResolvers } from './accounts';
import { AddressesFieldsResolvers } from './addresses';
import { AppsFieldsResolvers } from './apps';
import { BalanceFieldsResolvers } from './balances';
import { BillingFieldsResolvers } from './billing';
import { BillingItemsFieldsResolvers } from './billing-items';
import { CatalogItemsFieldsResolvers } from './catalog-items';
import { CatalogsFieldsResolvers } from './catalogs';
import { CheckoutsFieldsResolvers } from './checkouts';
import { ColorsFieldsResolvers } from './colors';
import { ComponentsFieldsResolvers } from './components';
import { CouponsFieldsResolvers } from './coupons';
import { CourseInstructorsFieldsResolvers } from './course-instructors';
import { CourseStudentsFieldsResolvers } from './course-students';
import { CoursesFieldsResolvers } from './courses';
import { CurrenciesFieldsResolvers } from './currencies';
import { DomainsFieldsResolvers } from './domains';
import { FeaturesFieldsResolvers } from './features';
import { HerosFieldsResolvers } from './heros';
import { ImagesFieldsResolvers } from './images';
import { InvoicesFieldsResolvers } from './invoices';
import { LanguagesFieldsResolvers } from './languages';
import { MaterialsFieldsResolvers } from './materials';
import { ModulesFieldsResolvers } from './modules';
import { OrderItemsFieldsResolvers } from './order-items';
import { OrdersFieldsResolvers } from './orders';
import { PagesFieldsResolvers } from './pages';
import { PaymentMethodsFieldsResolvers } from './payment-methods';
import { PaymentsFieldsResolvers } from './payments';
import { PhonesFieldsResolvers } from './phones';
import { PlansFieldsResolvers } from './plans';
import { PluginsFieldsResolvers } from './plugins';
import { PricesFieldsResolvers } from './prices';
import { ProductsFieldsResolvers } from './products';
import { RolesFieldsResolvers } from './roles';
import { SitesFieldsResolvers } from './sites';
import { SortedItemsFieldsResolvers } from './sorted-items';
import { SubscriptionContractItemsFieldsResolvers } from './subscription-contract-items';
import { SubscriptionContractsFieldsResolvers } from './subscription-contracts';
import { VersionsFieldsResolvers } from './versions';
import { VideoAuthorsFieldsResolvers } from './video-authors';
import { VideoViewsFieldsResolvers } from './video-views';
import { VideosFieldsResolvers } from './videos';

export const FieldsResolvers = [
  ...AccountsFieldsResolvers,
  ...AccessesFieldsResolvers,
  ...AppsFieldsResolvers,
  ...DomainsFieldsResolvers,
  ...CurrenciesFieldsResolvers,
  ...LanguagesFieldsResolvers,
  ...ColorsFieldsResolvers,
  ...ProductsFieldsResolvers,
  ...PricesFieldsResolvers,
  ...PaymentMethodsFieldsResolvers,
  ...PlansFieldsResolvers,
  ...ImagesFieldsResolvers,
  ...VideosFieldsResolvers,
  ...VideoAuthorsFieldsResolvers,
  ...ModulesFieldsResolvers,
  ...CoursesFieldsResolvers,
  ...CourseInstructorsFieldsResolvers,
  ...CourseStudentsFieldsResolvers,
  ...SubscriptionContractsFieldsResolvers,
  ...AddressesFieldsResolvers,
  ...PhonesFieldsResolvers,
  ...InvoicesFieldsResolvers,
  ...FeaturesFieldsResolvers,
  ...CatalogsFieldsResolvers,
  ...CatalogItemsFieldsResolvers,
  ...RolesFieldsResolvers,
  ...HerosFieldsResolvers,
  ...SortedItemsFieldsResolvers,
  ...SubscriptionContractItemsFieldsResolvers,
  ...VideoViewsFieldsResolvers,
  ...MaterialsFieldsResolvers,
  ...BillingItemsFieldsResolvers,
  ...BillingFieldsResolvers,
  ...OrderItemsFieldsResolvers,
  ...OrdersFieldsResolvers,
  ...PaymentsFieldsResolvers,
  ...CheckoutsFieldsResolvers,
  ...BalanceFieldsResolvers,
  ...ComponentsFieldsResolvers,
  ...PagesFieldsResolvers,
  ...SitesFieldsResolvers,
  ...VersionsFieldsResolvers,
  ...CouponsFieldsResolvers,
  ...PluginsFieldsResolvers
];
