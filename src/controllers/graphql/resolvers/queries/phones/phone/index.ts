import { Args, Query, Resolver } from '@nestjs/graphql';
import { PhonesLoader } from '@/controllers/graphql/dataloaders/phones.loader';
import { Phone } from '@/controllers/graphql/types/phone';
import { PhoneNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Phone)
export class PhoneResolver {
  constructor(private readonly phonesLoader: PhonesLoader) {}

  @Query(() => Phone)
  async phone(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const phone = await this.phonesLoader.findByIds.load(id);
    if (!phone) {
      throw new PhoneNotFoundException();
    }
    return phone;
  }
}
