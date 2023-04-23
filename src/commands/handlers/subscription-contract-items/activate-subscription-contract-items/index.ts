import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { ActivateSubscriptionContractItemsCommand } from '@/commands/implements/subscription-contract-items/activate-subscription-contract-items.command';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CreateCourseStudentService } from '@/services/course-students/create-course-student';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

@CommandHandler(ActivateSubscriptionContractItemsCommand)
export class ActivateSubscriptionContractItemsCommandHandler
  implements ICommandHandler<ActivateSubscriptionContractItemsCommand>
{
  constructor(
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly createCourseStudentService: CreateCourseStudentService
  ) {}

  async execute(command: ActivateSubscriptionContractItemsCommand) {
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
              await this.createCourseStudentService.execute({
                app: subscriptionContractItem.app,
                course: subscriptionContractItem.product,
                student: subscriptionContract.parent,
                createdBy: data.updatedBy
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
    command: ActivateSubscriptionContractItemsCommand
  ): ActivateSubscriptionContractItemsCommand {
    return cleanObject({
      subscriptionContract: cleanValue(command?.subscriptionContract),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
