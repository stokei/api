import { AccessesMutations } from './accesses';
import { AccountsMutations } from './accounts';
import { AddressesMutations } from './addresses';
import { AppsMutations } from './apps';
import { CatalogItemsMutations } from './catalog-items';
import { CatalogsMutations } from './catalogs';
import { CheckoutsMutations } from './checkouts';
import { ColorsMutations } from './colors';
import { ComponentsMutations } from './components';
import { CouponsMutations } from './coupons';
import { CourseInstructorsMutations } from './course-instructors';
import { CourseStudentsMutations } from './course-students';
import { CoursesMutations } from './courses';
import { CurrenciesMutations } from './currencies';
import { DomainsMutations } from './domains';
import { FeaturesMutations } from './features';
import { FilesMutations } from './files';
import { HerosMutations } from './heros';
import { ImagesMutations } from './images';
import { InvoicesMutations } from './invoices';
import { LanguagesMutations } from './languages';
import { MaterialsMutations } from './materials';
import { ModulesMutations } from './modules';
import { OrdersMutations } from './orders';
import { PagesMutations } from './pages';
import { PaymentMethodsMutations } from './payment-methods';
import { PaymentsMutations } from './payments';
import { PhonesMutations } from './phones';
import { PlansMutations } from './plans';
import { PricesMutations } from './prices';
import { ProductsMutations } from './products';
import { SitesMutations } from './sites';
import { SortedItemsMutations } from './sorted-items';
import { SubscriptionContractsMutations } from './subscription-contracts';
import { VersionsMutations } from './versions';
import { VideoAuthorsMutations } from './video-authors';
import { VideoViewsMutations } from './video-views';
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
  ...InvoicesMutations,
  ...FilesMutations,
  ...FeaturesMutations,
  ...CatalogsMutations,
  ...CatalogItemsMutations,
  ...HerosMutations,
  ...SortedItemsMutations,
  ...VideoViewsMutations,
  ...MaterialsMutations,
  ...OrdersMutations,
  ...PaymentsMutations,
  ...PagesMutations,
  ...SitesMutations,
  ...ComponentsMutations,
  ...VersionsMutations,
  ...CouponsMutations
];
