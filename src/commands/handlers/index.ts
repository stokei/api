import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { AppAdminCommandHandlers } from './app-admins';
import { AppInstructorCommandHandlers } from './app-instructors';
import { AppCommandHandlers } from './apps';
import { CheckoutCommandHandlers } from './checkouts';
import { ColorCommandHandlers } from './colors';
import { CourseInstructorCommandHandlers } from './course-instructors';
import { CourseStudentCommandHandlers } from './course-students';
import { CourseCommandHandlers } from './courses';
import { CurrencyCommandHandlers } from './currencies';
import { CustomerPortalSessionCommandHandlers } from './customer-portal-sessions';
import { DomainCommandHandlers } from './domains';
import { FeatureCommandHandlers } from './features';
import { FileCommandHandlers } from './files';
import { ImageCommandHandlers } from './images';
import { InvoiceCommandHandlers } from './invoices';
import { LanguageCommandHandlers } from './languages';
import { ModuleCommandHandlers } from './modules';
import { PaymentMethodCommandHandlers } from './payment-methods';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceTierCommandHandlers } from './price-tiers';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { RecurringCommandHandlers } from './recurrings';
import { SubscriptionContractItemCommandHandlers } from './subscription-contract-items';
import { SubscriptionContractCommandHandlers } from './subscription-contracts';
import { UsageRecordCommandHandlers } from './usage-records';
import { VideoAuthorCommandHandlers } from './video-authors';
import { VideoCommandHandlers } from './videos';

export const CommandHandlers = [
  ...AccessCommandHandlers,
  ...AccountCommandHandlers,
  ...AppCommandHandlers,
  ...AppAdminCommandHandlers,
  ...AppInstructorCommandHandlers,
  ...DomainCommandHandlers,
  ...CurrencyCommandHandlers,
  ...LanguageCommandHandlers,
  ...ColorCommandHandlers,
  ...ProductCommandHandlers,
  ...PriceCommandHandlers,
  ...PaymentMethodCommandHandlers,
  ...PlanCommandHandlers,
  ...ImageCommandHandlers,
  ...VideoCommandHandlers,
  ...VideoAuthorCommandHandlers,
  ...ModuleCommandHandlers,
  ...CourseCommandHandlers,
  ...CourseInstructorCommandHandlers,
  ...CourseStudentCommandHandlers,
  ...SubscriptionContractCommandHandlers,
  ...AddressCommandHandlers,
  ...PhoneCommandHandlers,
  ...CheckoutCommandHandlers,
  ...CustomerPortalSessionCommandHandlers,
  ...InvoiceCommandHandlers,
  ...FileCommandHandlers,
  ...RecurringCommandHandlers,
  ...FeatureCommandHandlers,
  ...PriceTierCommandHandlers,
  ...SubscriptionContractItemCommandHandlers,
  ...UsageRecordCommandHandlers
];
