import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Document } from '@/controllers/graphql/types/document';
import { Image } from '@/controllers/graphql/types/image';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';
import { FindPagarmeCustomerByIdService } from '@/services/pagarme/find-pagarme-customer-by-id';

@Resolver(() => MeAccount)
export class MeAccountDocumentResolver {
  constructor(
    private readonly findPagarmeCustomerByIdService: FindPagarmeCustomerByIdService
  ) {}

  @ResolveField(() => Image, { nullable: true })
  async document(@Parent() account: AccountModel): Promise<Document> {
    try {
      const pagarmeCustomer =
        account.pagarmeCustomer &&
        (await this.findPagarmeCustomerByIdService.execute(
          account.pagarmeCustomer
        ));
      if (!pagarmeCustomer?.document) {
        return;
      }
      return {
        document: pagarmeCustomer?.document,
        type: pagarmeCustomer?.document_type
      };
    } catch (error) {}
    return;
  }
}
