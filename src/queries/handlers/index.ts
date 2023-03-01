import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';
import { AddressQueriesHandlers } from './addresses';
import { AppQueriesHandlers } from './apps';
import { CatalogQueriesHandlers } from './catalogs';
import { ColorQueriesHandlers } from './colors';
import { CourseInstructorQueriesHandlers } from './course-instructors';
import { CourseStudentQueriesHandlers } from './course-students';
import { CourseQueriesHandlers } from './courses';
import { CurrencyQueriesHandlers } from './currencies';
import { DomainQueriesHandlers } from './domains';
import { FeatureQueriesHandlers } from './features';
import { FileQueriesHandlers } from './files';
import { ImageQueriesHandlers } from './images';
import { InvoiceQueriesHandlers } from './invoices';
import { LanguageQueriesHandlers } from './languages';
import { ModuleQueriesHandlers } from './modules';
import { PaymentMethodQueriesHandlers } from './payment-methods';
import { PhoneQueriesHandlers } from './phones';
import { PlanQueriesHandlers } from './plans';
import { PriceTierQueriesHandlers } from './price-tiers';
import { PriceQueriesHandlers } from './prices';
import { ProductQueriesHandlers } from './products';
import { RecurringQueriesHandlers } from './recurrings';
import { SubscriptionContractItemQueriesHandlers } from './subscription-contract-items';
import { SubscriptionContractQueriesHandlers } from './subscription-contracts';
import { UsageRecordQueriesHandlers } from './usage-records';
import { VideoAuthorQueriesHandlers } from './video-authors';
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
  ...CatalogQueriesHandlers
];
