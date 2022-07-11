import { AccessServices } from './accesses';
import { AccountServices } from './accounts';
import { AddressServices } from './addresses';
import { CardServices } from './cards';
import { CartServices } from './carts';
import { CartsItemServices } from './carts-items';
import { ClassroomServices } from './classrooms';
import { ClassroomInstructorServices } from './classroom-instructors';
import { ClassroomModuleServices } from './classroom-module s';
import { ClassroomStudentServices } from './classroom-students';
import { ColorServices } from './colors';
import { CourseServices } from './courses';
import { CourseInstructorServices } from './course-instructors';
import { CourseStudentServices } from './course-students';
import { CurrencyServices } from './currencies';
import { DomainServices } from './domains';
import { ImageServices } from './images';
import { LanguageServices } from './languages';
import { ModuleServices } from './modules';
import { ModuleVideoServices } from './module-videos';
import { OrderServices } from './orders';
import { OrderItemServices } from './order-items';
import { PaymentServices } from './payments';
import { PaymentMethodServices } from './payment-methods';
import { PhoneServices } from './phones';
import { PlanServices } from './plans';
import { PriceServices } from './prices';
import { ProductServices } from './products';
import { ProjectServices } from './projects';
import { SubscriptionServices } from './subscriptions';
import { VideoServices } from './videos';
import { VideosAuthorServices } from './videos-authors';

export const Services = [
  ...AccountServices,
  ...AccessServices,
  ...ProjectServices,
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
  ...CardServices,
  ...CartServices,
  ...CartsItemServices,
  ...PlanServices,
  ...ImageServices,
  ...VideoServices,
  ...VideosAuthorServices,
  ...ModuleServices,
  ...ModuleVideoServices,
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
