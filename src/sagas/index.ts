import { AccessesSagas } from './accesses.saga';
import { AccountsSagas } from './accounts.saga';
import { AddressesSagas } from './addresses.saga';
import { AppsSagas } from './apps.saga';
import { CatalogItemsSagas } from './catalog-items.saga';
import { CatalogsSagas } from './catalogs.saga';
import { ColorsSagas } from './colors.saga';
import { CouponsSagas } from './coupons.saga';
import { CourseInstructorsSagas } from './course-instructors.saga';
import { CourseStudentsSagas } from './course-students.saga';
import { CoursesSagas } from './courses.saga';
import { CurrenciesSagas } from './currencies.saga';
import { DomainsSagas } from './domains.saga';
import { FeaturesSagas } from './features.saga';
import { FilesSagas } from './files.saga';
import { HerosSagas } from './heros.saga';
import { ImagesSagas } from './images.saga';
import { InvoicesSagas } from './invoices.saga';
import { LanguagesSagas } from './languages.saga';
import { MaterialsSagas } from './materials.saga';
import { ModulesSagas } from './modules.saga';
import { OrderItemsSagas } from './order-items.saga';
import { OrdersSagas } from './orders.saga';
import { PaymentMethodsSagas } from './payment-methods.saga';
import { PaymentsSagas } from './payments.saga';
import { PhonesSagas } from './phones.saga';
import { PlansSagas } from './plans.saga';
import { PriceTiersSagas } from './price-tiers.saga';
import { PricesSagas } from './prices.saga';
import { ProductsSagas } from './products.saga';
import { RecurringsSagas } from './recurrings.saga';
import { RolesSagas } from './roles.saga';
import { SortedItemsSagas } from './sorted-items.saga';
import { SubscriptionContractItemsSagas } from './subscription-contract-items.saga';
import { SubscriptionContractsSagas } from './subscription-contracts.saga';
import { UsageRecordsSagas } from './usage-records.saga';
import { VideoAuthorsSagas } from './video-authors.saga';
import { VideoViewsSagas } from './video-views.saga';
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
  FilesSagas,
  FeaturesSagas,
  PriceTiersSagas,
  RecurringsSagas,
  SubscriptionContractItemsSagas,
  UsageRecordsSagas,
  CatalogsSagas,
  CatalogItemsSagas,
  RolesSagas,
  HerosSagas,
  SortedItemsSagas,
  VideoViewsSagas,
  MaterialsSagas,
  OrdersSagas,
  OrderItemsSagas,
  PaymentsSagas,
  CouponsSagas
];
