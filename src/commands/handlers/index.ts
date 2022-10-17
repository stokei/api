import { AccessCommandHandlers } from './accesses';
import { AccountCommandHandlers } from './accounts';
import { AddressCommandHandlers } from './addresses';
import { AppCommandHandlers } from './apps';
import { CheckoutCommandHandlers } from './checkouts';
import { ColorCommandHandlers } from './colors';
import { CourseInstructorCommandHandlers } from './course-instructors';
import { CourseStudentCommandHandlers } from './course-students';
import { CourseCommandHandlers } from './courses';
import { CurrencyCommandHandlers } from './currencies';
import { CustomerPortalSessionCommandHandlers } from './customer-portal-sessions';
import { DomainCommandHandlers } from './domains';
import { FileCommandHandlers } from './files';
import { ImageCommandHandlers } from './images';
import { InvoiceCommandHandlers } from './invoices';
import { LanguageCommandHandlers } from './languages';
import { ModuleCommandHandlers } from './modules';
import { PaymentMethodCommandHandlers } from './payment-methods';
import { PhoneCommandHandlers } from './phones';
import { PlanCommandHandlers } from './plans';
import { PriceCommandHandlers } from './prices';
import { ProductCommandHandlers } from './products';
import { SubscriptionContractCommandHandlers } from './subscription-contracts';
import { VideoAuthorCommandHandlers } from './video-authors';
import { VideoCommandHandlers } from './videos';

export const CommandHandlers = [
  ...AccessCommandHandlers,
  ...AccountCommandHandlers,
  ...AppCommandHandlers,
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
  ...FileCommandHandlers
];
