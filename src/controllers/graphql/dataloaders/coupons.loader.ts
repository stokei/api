import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCouponsService } from '@/services/coupons/find-all-coupons';

@Injectable({ scope: Scope.REQUEST })
export class CouponsLoader {
  constructor(private readonly couponsService: FindAllCouponsService) {}

  readonly findByIds = new DataLoader(async (couponIds: string[]) => {
    const coupons = await this.couponsService.execute({
      where: {
        AND: {
          ids: couponIds
        }
      }
    });
    const couponsMap = new Map(
      coupons?.items?.map((coupon) => [coupon.id, coupon])
    );
    return couponIds.map((couponId) => couponsMap.get(couponId));
  });
}
