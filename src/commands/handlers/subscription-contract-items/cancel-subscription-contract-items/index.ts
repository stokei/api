import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { CancelSubscriptionContractItemsCommand } from '@/commands/implements/subscription-contract-items/cancel-subscription-contract-items.command';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { RemoveCourseStudentService } from '@/services/course-students/remove-course-student';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

@CommandHandler(CancelSubscriptionContractItemsCommand)
export class CancelSubscriptionContractItemsCommandHandler
  implements ICommandHandler<CancelSubscriptionContractItemsCommand>
{
  constructor(
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly removeCourseStudentService: RemoveCourseStudentService
  ) {}

  async execute(command: CancelSubscriptionContractItemsCommand) {
    const data = this.clearData(command);

    try {
      const subscriptionContract =
        await this.findSubscriptionContractByIdService.execute(
          data.subscriptionContract
        );

      const subscriptionContractItems =
        await this.findAllSubscriptionContractItemsService.execute({
          where: {
            AND: {
              parent: {
                equals: data.subscriptionContract
              }
            }
          }
        });
      if (!subscriptionContractItems?.totalCount) {
        return [];
      }

      return await Promise.all(
        subscriptionContractItems.items.map(
          async (subscriptionContractItem) => {
            const isCourse =
              splitServiceId(subscriptionContractItem.product)?.service ===
              ServerStokeiApiIdPrefix.COURSES;
            if (isCourse) {
              await this.removeCourseStudentService.execute({
                where: {
                  app: subscriptionContractItem.app,
                  course: subscriptionContractItem.product,
                  student: subscriptionContract.parent,
                  removedBy: data.updatedBy
                }
              });
            }
          }
        )
      );
    } catch (error) {
      return [];
    }
  }

  private clearData(
    command: CancelSubscriptionContractItemsCommand
  ): CancelSubscriptionContractItemsCommand {
    return cleanObject({
      subscriptionContract: cleanValue(command?.subscriptionContract),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
