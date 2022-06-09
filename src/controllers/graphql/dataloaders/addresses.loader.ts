import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllAddressesService } from '@/services/addresses/find-all-addresses';

@Injectable({ scope: Scope.REQUEST })
export class AddressesLoader {
  constructor(private readonly addressesService: FindAllAddressesService) {}

  readonly findByIds = new DataLoader(async (addressIds: string[]) => {
    const addresses = await this.addressesService.execute({
      where: {
        AND: {
          ids: addressIds
        }
      }
    });
    const addressesMap = new Map(
      addresses?.items?.map((address) => [address.id, address])
    );
    return addressIds.map((addressId) => addressesMap.get(addressId));
  });
}
