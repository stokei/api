import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { AddAppAdminToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-app-admin-to-app-subscription-contract.command';
import { AddAppInstructorToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-app-instructor-to-app-subscription-contract.command';
import { RemoveAppAdminFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-app-admin-from-app-subscription-contract.command';
import { RemoveAppInstructorFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-app-instructor-from-app-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { roleName } from '@/constants/role-name';
import { RoleCreatedEvent } from '@/events/implements/roles/role-created.event';
import { RoleRemovedEvent } from '@/events/implements/roles/role-removed.event';

@Injectable()
export class RolesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(RolesSagas.name);
    this.logger.log(`Saga ${RolesSagas.name} init`);
  }

  @Saga()
  roleCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RoleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RoleCreatedEvent] Saga event roleCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (event.role?.name === roleName.ADMIN) {
          commands.push(
            new AddAppAdminToAppSubscriptionContractCommand({
              admin: event.role.parent,
              app: event.role.app,
              createdBy: event.createdBy
            })
          );
        }
        if (event.role?.name === roleName.INSTRUCTOR) {
          commands.push(
            new AddAppInstructorToAppSubscriptionContractCommand({
              instructor: event.role.parent,
              app: event.role.app,
              createdBy: event.createdBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  roleRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RoleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RoleRemovedEvent] Saga event roleRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (event.role?.name === roleName.ADMIN) {
          commands.push(
            new RemoveAppAdminFromAppSubscriptionContractCommand({
              admin: event.role.parent,
              app: event.role.app,
              removedBy: event.removedBy
            })
          );
        }
        if (event.role?.name === roleName.INSTRUCTOR) {
          commands.push(
            new RemoveAppInstructorFromAppSubscriptionContractCommand({
              instructor: event.role.parent,
              app: event.role.app,
              removedBy: event.removedBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
