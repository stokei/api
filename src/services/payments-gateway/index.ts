import { PaymentsGatewayFactoriesServices } from './factories';
import { PaymentsGatewayProcessorsServices } from './processors';

export const PaymentsGatewayServices = [
  ...PaymentsGatewayProcessorsServices,
  ...PaymentsGatewayFactoriesServices
];
