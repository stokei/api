import { AccessServices } from './accesses';
import { AccountServices } from './accounts';
import { AddressServices } from './addresses';
import { AppServices } from './apps';
import { CacheServices } from './cache';
import { CatalogItemServices } from './catalog-items';
import { CatalogServices } from './catalogs';
import { CheckoutServices } from './checkouts';
import { CloudflareServices } from './cloudflare';
import { ColorServices } from './colors';
import { ComponentServices } from './components';
import { CouponServices } from './coupons';
import { CourseInstructorServices } from './course-instructors';
import { CourseStudentServices } from './course-students';
import { CourseServices } from './courses';
import { CurrencyServices } from './currencies';
import { DomainServices } from './domains';
import { EmailServices } from './emails';
import { FeatureServices } from './features';
import { FileServices } from './files';
import { HeroServices } from './heros';
import { ImageServices } from './images';
import { InvoiceServices } from './invoices';
import { LanguageServices } from './languages';
import { MaterialServices } from './materials';
import { ModuleServices } from './modules';
import { OrderItemServices } from './order-items';
import { OrderServices } from './orders';
import { PagarmeServices } from './pagarme';
import { PageServices } from './pages';
import { PaymentMethodServices } from './payment-methods';
import { PaymentServices } from './payments';
import { PaymentsGatewayServices } from './payments-gateway';
import { PhoneServices } from './phones';
import { PlanServices } from './plans';
import { PluginServices } from './plugins';
import { PriceTierServices } from './price-tiers';
import { PriceServices } from './prices';
import { ProductServices } from './products';
import { RecurringServices } from './recurrings';
import { RoleServices } from './roles';
import { SiteServices } from './sites';
import { SortedItemServices } from './sorted-items';
import { StripeServices } from './stripe';
import { SubscriptionContractItemServices } from './subscription-contract-items';
import { SubscriptionContractServices } from './subscription-contracts';
import { TusServices } from './tus';
import { UsageRecordServices } from './usage-records';
import { VercelServices } from './vercel';
import { VersionServices } from './versions';
import { VideoAuthorServices } from './video-authors';
import { VideoViewServices } from './video-views';
import { VideoServices } from './videos';
import { WebhookServices } from './webhooks';

export const Services = [
  ...AccountServices,
  ...AccessServices,
  ...AppServices,
  ...CacheServices,
  ...DomainServices,
  ...CurrencyServices,
  ...LanguageServices,
  ...ColorServices,
  ...ProductServices,
  ...PriceServices,
  ...PaymentMethodServices,
  ...PlanServices,
  ...ImageServices,
  ...VideoServices,
  ...VideoAuthorServices,
  ...ModuleServices,
  ...CourseServices,
  ...CourseInstructorServices,
  ...CourseStudentServices,
  ...SubscriptionContractServices,
  ...AddressServices,
  ...PhoneServices,
  ...CheckoutServices,
  ...WebhookServices,
  ...InvoiceServices,
  ...FileServices,
  ...RecurringServices,
  ...FeatureServices,
  ...PriceTierServices,
  ...SubscriptionContractItemServices,
  ...UsageRecordServices,
  ...CloudflareServices,
  ...TusServices,
  ...CatalogServices,
  ...CatalogItemServices,
  ...RoleServices,
  ...HeroServices,
  ...SortedItemServices,
  ...EmailServices,
  ...VercelServices,
  ...MaterialServices,
  ...VideoViewServices,
  ...PagarmeServices,
  ...OrderItemServices,
  ...OrderServices,
  ...PaymentServices,
  ...ComponentServices,
  ...PageServices,
  ...SiteServices,
  ...VersionServices,
  ...CouponServices,
  ...StripeServices,
  ...PaymentsGatewayServices,
  ...PluginServices
];
