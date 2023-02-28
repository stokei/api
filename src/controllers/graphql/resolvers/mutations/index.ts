import { AccessesMutations } from './accesses';
import { AccountsMutations } from './accounts';
import { AddressesMutations } from './addresses';
import { AppsMutations } from './apps';
import { CheckoutsMutations } from './checkouts';
import { ColorsMutations } from './colors';
import { CourseInstructorsMutations } from './course-instructors';
import { CourseStudentsMutations } from './course-students';
import { CoursesMutations } from './courses';
import { CurrenciesMutations } from './currencies';
import { CustomerPortalSessionsMutations } from './customer-portal-sessions';
import { DomainsMutations } from './domains';
import { FeaturesMutations } from './features';
import { FilesMutations } from './files';
import { ImagesMutations } from './images';
import { InvoicesMutations } from './invoices';
import { LanguagesMutations } from './languages';
import { ModulesMutations } from './modules';
import { PaymentMethodsMutations } from './payment-methods';
import { PhonesMutations } from './phones';
import { PlansMutations } from './plans';
import { PricesMutations } from './prices';
import { ProductsMutations } from './products';
import { SubscriptionContractsMutations } from './subscription-contracts';
import { VideoAuthorsMutations } from './video-authors';
import { VideosMutations } from './videos';

export const Mutations = [
  ...AccountsMutations,
  ...AccessesMutations,
  ...AppsMutations,
  ...DomainsMutations,
  ...CurrenciesMutations,
  ...ImagesMutations,
  ...LanguagesMutations,
  ...ColorsMutations,
  ...ProductsMutations,
  ...PricesMutations,
  ...PaymentMethodsMutations,
  ...PlansMutations,
  ...VideosMutations,
  ...VideoAuthorsMutations,
  ...ModulesMutations,
  ...CoursesMutations,
  ...CourseInstructorsMutations,
  ...CourseStudentsMutations,
  ...SubscriptionContractsMutations,
  ...AddressesMutations,
  ...PhonesMutations,
  ...CheckoutsMutations,
  ...CustomerPortalSessionsMutations,
  ...InvoicesMutations,
  ...FilesMutations,
  ...FeaturesMutations
];
