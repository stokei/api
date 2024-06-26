import { Field, InputType } from '@nestjs/graphql';

import { PaymentGatewayType } from '@/controllers/graphql/enums/payment-gateway-type.enum';

@InputType()
export class CreateAppPaymentOnboardingLinkInput {
  @Field()
  cancelURL: string;

  @Field()
  successURL: string;

  @Field(() => PaymentGatewayType)
  paymentGatewayType: PaymentGatewayType;
}
