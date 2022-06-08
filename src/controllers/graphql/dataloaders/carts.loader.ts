import { Injectable, Scope } from '@nestjs/common';
import { FindAllCartsService } from '@/services/carts/find-all-carts';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CartsLoader {
  constructor(private readonly cartsService: FindAllCartsService) {}

  readonly findByIds = new DataLoader(async (cartIds: string[]) => {
    const carts = await this.cartsService.execute({
      where: {
        AND: {
          ids: cartIds
        }
      }
    });
    const cartsMap = new Map(carts?.items?.map((cart) => [cart.id, cart]));
    return cartIds.map((cartId) => cartsMap.get(cartId));
  });
}
