import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';
import { AddressQueriesHandlers } from './addresses';
import { AppQueriesHandlers } from './apps';
import { CatalogItemQueriesHandlers } from './catalog-items';
import { CatalogQueriesHandlers } from './catalogs';
import { ColorQueriesHandlers } from './colors';
import { ComponentQueriesHandlers } from './components';
import { CouponQueriesHandlers } from './coupons';
import { CourseInstructorQueriesHandlers } from './course-instructors';
import { CourseStudentQueriesHandlers } from './course-students';
import { CourseQueriesHandlers } from './courses';
import { CurrencyQueriesHandlers } from './currencies';
import { DomainQueriesHandlers } from './domains';
import { FeatureQueriesHandlers } from './features';
import { FileQueriesHandlers } from './files';
import { HeroQueriesHandlers } from './heros';
import { ImageQueriesHandlers } from './images';
import { InvoiceQueriesHandlers } from './invoices';
import { LanguageQueriesHandlers } from './languages';
import { MaterialQueriesHandlers } from './materials';
import { ModuleQueriesHandlers } from './modules';
import { OrderItemQueriesHandlers } from './order-items';
import { OrderQueriesHandlers } from './orders';
import { PageQueriesHandlers } from './pages';
import { PaymentMethodQueriesHandlers } from './payment-methods';
import { PaymentQueriesHandlers } from './payments';
import { PhoneQueriesHandlers } from './phones';
import { PlanQueriesHandlers } from './plans';
import { PluginQueriesHandlers } from './plugins';
import { PriceTierQueriesHandlers } from './price-tiers';
import { PriceQueriesHandlers } from './prices';
import { ProductComboItemQueriesHandlers } from './product-combo-items';
import { ProductQueriesHandlers } from './products';
import { RecurringQueriesHandlers } from './recurrings';
import { RoleQueriesHandlers } from './roles';
import { SiteQueriesHandlers } from './sites';
import { SortedItemQueriesHandlers } from './sorted-items';
import { SubscriptionContractItemQueriesHandlers } from './subscription-contract-items';
import { SubscriptionContractQueriesHandlers } from './subscription-contracts';
import { UsageRecordQueriesHandlers } from './usage-records';
import { VersionQueriesHandlers } from './versions';
import { VideoAuthorQueriesHandlers } from './video-authors';
import { VideoViewQueriesHandlers } from './video-views';
import { VideoQueriesHandlers } from './videos';

export const QueriesHandlers = [
  ...AccountQueriesHandlers,
  ...AccessQueriesHandlers,
  ...AppQueriesHandlers,
  ...DomainQueriesHandlers,
  ...CurrencyQueriesHandlers,
  ...LanguageQueriesHandlers,
  ...ColorQueriesHandlers,
  ...ProductQueriesHandlers,
  ...PriceQueriesHandlers,
  ...PaymentMethodQueriesHandlers,
  ...PlanQueriesHandlers,
  ...ImageQueriesHandlers,
  ...VideoQueriesHandlers,
  ...VideoAuthorQueriesHandlers,
  ...ModuleQueriesHandlers,
  ...CourseQueriesHandlers,
  ...CourseInstructorQueriesHandlers,
  ...CourseStudentQueriesHandlers,
  ...SubscriptionContractQueriesHandlers,
  ...AddressQueriesHandlers,
  ...PhoneQueriesHandlers,
  ...InvoiceQueriesHandlers,
  ...FileQueriesHandlers,
  ...RecurringQueriesHandlers,
  ...FeatureQueriesHandlers,
  ...PriceTierQueriesHandlers,
  ...SubscriptionContractItemQueriesHandlers,
  ...UsageRecordQueriesHandlers,
  ...CatalogQueriesHandlers,
  ...CatalogItemQueriesHandlers,
  ...RoleQueriesHandlers,
  ...HeroQueriesHandlers,
  ...SortedItemQueriesHandlers,
  ...VideoViewQueriesHandlers,
  ...MaterialQueriesHandlers,
  ...OrderQueriesHandlers,
  ...OrderItemQueriesHandlers,
  ...PaymentQueriesHandlers,
  ...ComponentQueriesHandlers,
  ...PageQueriesHandlers,
  ...SiteQueriesHandlers,
  ...VersionQueriesHandlers,
  ...CouponQueriesHandlers,
  ...PluginQueriesHandlers,
  ...ProductComboItemQueriesHandlers
];
