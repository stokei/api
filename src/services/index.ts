import { AccessServices } from './accesses';
import { AccountServices } from './accounts';
import { AddressServices } from './addresses';
import { AppServices } from './apps';
import { CheckoutServices } from './checkouts';
import { ClassroomInstructorServices } from './classroom-instructors';
import { ClassroomModuleServices } from './classroom-modules';
import { ClassroomStudentServices } from './classroom-students';
import { ClassroomServices } from './classrooms';
import { ColorServices } from './colors';
import { CourseInstructorServices } from './course-instructors';
import { CourseStudentServices } from './course-students';
import { CourseServices } from './courses';
import { CurrencyServices } from './currencies';
import { CustomerPortalSessionServices } from './customer-portal-sessions';
import { DomainServices } from './domains';
import { ImageServices } from './images';
import { InvoiceServices } from './invoices';
import { LanguageServices } from './languages';
import { ModuleServices } from './modules';
import { PaymentMethodServices } from './payment-methods';
import { PhoneServices } from './phones';
import { PlanServices } from './plans';
import { PriceServices } from './prices';
import { ProductServices } from './products';
import { QencodeServices } from './qencode';
import { StripeServices } from './stripe';
import { SubscriptionContractServices } from './subscription-contracts';
import { VideoAuthorServices } from './video-authors';
import { VideoServices } from './videos';
import { WebhookServices } from './webhooks';

export const Services = [
  ...AccountServices,
  ...AccessServices,
  ...AppServices,
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
  ...ClassroomServices,
  ...ClassroomStudentServices,
  ...SubscriptionContractServices,
  ...ClassroomInstructorServices,
  ...ClassroomModuleServices,
  ...AddressServices,
  ...PhoneServices,
  ...StripeServices,
  ...CheckoutServices,
  ...CustomerPortalSessionServices,
  ...WebhookServices,
  ...InvoiceServices,
  ...QencodeServices
];
