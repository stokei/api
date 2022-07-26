import { AccessServices } from './accesses';
import { AccountServices } from './accounts';
import { AddressServices } from './addresses';
import { AppServices } from './apps';
import { CartItemServices } from './cart-items';
import { CartServices } from './carts';
import { ClassroomInstructorServices } from './classroom-instructors';
import { ClassroomModuleServices } from './classroom-modules';
import { ClassroomStudentServices } from './classroom-students';
import { ClassroomServices } from './classrooms';
import { ColorServices } from './colors';
import { CourseInstructorServices } from './course-instructors';
import { CourseStudentServices } from './course-students';
import { CourseServices } from './courses';
import { CurrencyServices } from './currencies';
import { DomainServices } from './domains';
import { ImageServices } from './images';
import { LanguageServices } from './languages';
import { ModuleServices } from './modules';
import { OrderItemServices } from './order-items';
import { OrderServices } from './orders';
import { PaymentMethodServices } from './payment-methods';
import { PaymentServices } from './payments';
import { PhoneServices } from './phones';
import { PlanServices } from './plans';
import { PriceServices } from './prices';
import { ProductServices } from './products';
import { SubscriptionServices } from './subscriptions';
import { VideoAuthorServices } from './video-authors';
import { VideoServices } from './videos';

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
  ...OrderServices,
  ...OrderItemServices,
  ...PaymentServices,
  ...PaymentMethodServices,
  ...CartServices,
  ...CartItemServices,
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
  ...SubscriptionServices,
  ...ClassroomInstructorServices,
  ...ClassroomModuleServices,
  ...AddressServices,
  ...PhoneServices
];
