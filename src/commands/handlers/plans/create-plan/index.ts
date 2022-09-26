import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreatePlanCommand } from '@/commands/implements/plans/create-plan.command';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException
} from '@/errors';
import { PlanModel } from '@/models/plan.model';
import { CreatePlanRepository } from '@/repositories/plans/create-plan';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CalculatePlanPriceService } from '@/services/plans/calculate-plan-price';
import { CreatePriceService } from '@/services/prices/create-price';
import { CreateProductService } from '@/services/products/create-product';

type CreatePlanCommandKeys = keyof CreatePlanCommand;

@CommandHandler(CreatePlanCommand)
export class CreatePlanCommandHandler
  implements ICommandHandler<CreatePlanCommand>
{
  constructor(
    private readonly createPlanRepository: CreatePlanRepository,
    private readonly calculatePlanPriceService: CalculatePlanPriceService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createProductService: CreateProductService,
    private readonly createPriceService: CreatePriceService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('app');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('createdBy');
    }
    if (data.quantityCourses < 0) {
      data.quantityCourses = 0;
    }
    if (data.quantityInstructorPerCourses < 0) {
      data.quantityInstructorPerCourses = 0;
    }
    if (data.quantityClassroomsPerCourses < 0) {
      data.quantityClassroomsPerCourses = 0;
    }
    if (data.quantityModulesPerClassrooms < 0) {
      data.quantityModulesPerClassrooms = 0;
    }
    if (data.quantityVideosPerModules < 0) {
      data.quantityVideosPerModules = 0;
    }

    const { app: appId, ...createPlanData } = data;
    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }

    const { applicationFeePercentage, totalPriceAmount } =
      await this.calculatePlanPriceService.execute({
        currency: app.currency,
        hasCustomDomain: data.hasCustomDomain,
        hasCustomSite: data.hasCustomSite,
        quantityCourses: data.quantityCourses,
        quantityInstructorPerCourses: data.quantityInstructorPerCourses,
        quantityClassroomsPerCourses: data.quantityClassroomsPerCourses,
        quantityModulesPerClassrooms: data.quantityModulesPerClassrooms,
        quantityVideosPerModules: data.quantityVideosPerModules
      });

    const planCreated = await this.createPlanRepository.execute({
      ...createPlanData,
      name: `${app.name} Premium`,
      applicationFeePercentage
    });
    if (!planCreated) {
      throw new PlanNotFoundException();
    }

    const product = await this.createProductService.execute({
      app: app.id,
      checkoutVisible: false,
      name: planCreated.name,
      parent: planCreated.id,
      createdBy: data.createdBy
    });

    const price = await this.createPriceService.execute({
      parent: product.id,
      app: app.id,
      fromAmount: totalPriceAmount,
      amount: totalPriceAmount,
      createdBy: data.createdBy,
      currency: app.currency,
      type: PriceType.RECURRING,
      recurringIntervalCount: 1,
      default: true,
      recurringIntervalType: RecurringType.MONTH,
      inventoryType: InventoryType.INFINITE
    });

    const planUpdated = new PlanModel({
      ...planCreated,
      product: product.id,
      price: price.id
    });
    const planModel = this.publisher.mergeObjectContext(planUpdated);
    planModel.createdPlan({
      createdBy: data.createdBy
    });
    planModel.commit();

    return planUpdated;
  }

  private clearData(command: CreatePlanCommand): CreatePlanCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      hasCustomDomain: cleanValueBoolean(command?.hasCustomDomain),
      hasCustomSite: cleanValueBoolean(command?.hasCustomSite),
      quantityCourses: cleanValueNumber(command?.quantityCourses),
      quantityInstructorPerCourses: cleanValueNumber(
        command?.quantityInstructorPerCourses
      ),
      quantityClassroomsPerCourses: cleanValueNumber(
        command?.quantityClassroomsPerCourses
      ),
      quantityModulesPerClassrooms: cleanValueNumber(
        command?.quantityModulesPerClassrooms
      ),
      quantityVideosPerModules: cleanValueNumber(
        command?.quantityVideosPerModules
      )
    });
  }
}
