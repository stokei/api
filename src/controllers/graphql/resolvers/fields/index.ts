import { AccessesFieldsResolvers } from './accesses';
import { AccountsFieldsResolvers } from './accounts';
import { AddressesFieldsResolvers } from './addresses';
import { AppsFieldsResolvers } from './apps';
import { CatalogItemsFieldsResolvers } from './catalog-items';
import { CatalogsFieldsResolvers } from './catalogs';
import { ColorsFieldsResolvers } from './colors';
import { CourseInstructorsFieldsResolvers } from './course-instructors';
import { CourseStudentsFieldsResolvers } from './course-students';
import { CoursesFieldsResolvers } from './courses';
import { CurrenciesFieldsResolvers } from './currencies';
import { DomainsFieldsResolvers } from './domains';
import { FeaturesFieldsResolvers } from './features';
import { ImagesFieldsResolvers } from './images';
import { InvoicesFieldsResolvers } from './invoices';
import { LanguagesFieldsResolvers } from './languages';
import { ModulesFieldsResolvers } from './modules';
import { PaymentMethodsFieldsResolvers } from './payment-methods';
import { PhonesFieldsResolvers } from './phones';
import { PlansFieldsResolvers } from './plans';
import { PricesFieldsResolvers } from './prices';
import { ProductsFieldsResolvers } from './products';
import { SubscriptionContractsFieldsResolvers } from './subscription-contracts';
import { VideoAuthorsFieldsResolvers } from './video-authors';
import { VideosFieldsResolvers } from './videos';

export const FieldsResolvers = [
  ...AccountsFieldsResolvers,
  ...AccessesFieldsResolvers,
  ...AppsFieldsResolvers,
  ...DomainsFieldsResolvers,
  ...CurrenciesFieldsResolvers,
  ...LanguagesFieldsResolvers,
  ...ColorsFieldsResolvers,
  ...ProductsFieldsResolvers,
  ...PricesFieldsResolvers,
  ...PaymentMethodsFieldsResolvers,
  ...PlansFieldsResolvers,
  ...ImagesFieldsResolvers,
  ...VideosFieldsResolvers,
  ...VideoAuthorsFieldsResolvers,
  ...ModulesFieldsResolvers,
  ...CoursesFieldsResolvers,
  ...CourseInstructorsFieldsResolvers,
  ...CourseStudentsFieldsResolvers,
  ...SubscriptionContractsFieldsResolvers,
  ...AddressesFieldsResolvers,
  ...PhonesFieldsResolvers,
  ...InvoicesFieldsResolvers,
  ...FeaturesFieldsResolvers,
  ...CatalogsFieldsResolvers,
  ...CatalogItemsFieldsResolvers
];
