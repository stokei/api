import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject, splitServiceId } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateOrFindCourseStudentCommand } from '@/commands/implements/course-students/create-or-find-course-student.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractActivatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-activated.event';
import { SubscriptionContractCanceledEvent } from '@/events/implements/subscription-contracts/subscription-contract-canceled.event';
import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';
import { SubscriptionContractUpdatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-updated.event';

@Injectable()
export class SubscriptionContractsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SubscriptionContractsSagas.name);
    this.logger.log(`Saga ${SubscriptionContractsSagas.name} init`);
  }

  @Saga()
  subscriptionContractCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractCreatedEvent] Saga event subscriptionContractCreated: ' +
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
  subscriptionContractUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractUpdatedEvent] Saga event subscriptionContractUpdated:' +
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
  subscriptionContractActivated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractActivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractActivatedEvent] Saga event subscriptionContractActivated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        let commands = [];

        const subscriptionContract = event.subscriptionContract;

        const subscriptionContractServiceType = splitServiceId(
          subscriptionContract.product
        ).service;

        if (
          subscriptionContractServiceType === ServerStokeiApiIdPrefix.COURSES
        ) {
          commands = [
            ...commands,
            new CreateOrFindCourseStudentCommand({
              app: subscriptionContract.app,
              course: subscriptionContract.product,
              student: subscriptionContract.parent,
              createdBy: subscriptionContract.createdBy
            })
          ];
        }

        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  subscriptionContractCanceled = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractCanceledEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractCanceledEvent] Saga event subscriptionContractCanceled:' +
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
