import { AccessesSagas } from './accesses.saga';
import { AccountsSagas } from './accounts.saga';
import { AddressesSagas } from './addresses.saga';
import { AppsSagas } from './apps.saga';
import { ColorsSagas } from './colors.saga';
import { CourseInstructorsSagas } from './course-instructors.saga';
import { CourseStudentsSagas } from './course-students.saga';
import { CoursesSagas } from './courses.saga';
import { CurrenciesSagas } from './currencies.saga';
import { DomainsSagas } from './domains.saga';
import { FilesSagas } from './files.saga';
import { ImagesSagas } from './images.saga';
import { InvoicesSagas } from './invoices.saga';
import { LanguagesSagas } from './languages.saga';
import { ModulesSagas } from './modules.saga';
import { PaymentMethodsSagas } from './payment-methods.saga';
import { PhonesSagas } from './phones.saga';
import { PlansSagas } from './plans.saga';
import { PricesSagas } from './prices.saga';
import { ProductsSagas } from './products.saga';
import { SubscriptionContractsSagas } from './subscription-contracts.saga';
import { VideoAuthorsSagas } from './video-authors.saga';
import { VideosSagas } from './videos.saga';

export const Sagas = [
  AccountsSagas,
  AccessesSagas,
  AppsSagas,
  DomainsSagas,
  CurrenciesSagas,
  LanguagesSagas,
  ColorsSagas,
  ProductsSagas,
  PricesSagas,
  PaymentMethodsSagas,
  PlansSagas,
  ImagesSagas,
  VideosSagas,
  VideoAuthorsSagas,
  ModulesSagas,
  CoursesSagas,
  CourseInstructorsSagas,
  CourseStudentsSagas,
  SubscriptionContractsSagas,
  AddressesSagas,
  PhonesSagas,
  InvoicesSagas,
  FilesSagas
];
