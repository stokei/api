import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CouponCreatedEvent } from '@/events/implements/coupons/coupon-created.event';
import { CouponUpdatedEvent } from '@/events/implements/coupons/coupon-updated.event';

@Injectable()
export class CouponsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CouponsSagas.name);
    this.logger.log(`Saga ${CouponsSagas.name} init`);
  }

  @Saga()
  couponCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CouponCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CouponCreatedEvent] Saga event couponCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  couponUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CouponUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CouponUpdatedEvent] Saga event couponUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
