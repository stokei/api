import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeAccountOnboardingLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-onboarding-link.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AppNotFoundException,
  AppUnauthorizedException,
  DataNotFoundException,
  ParamNotFoundException,
  PlanUnauthorizedException,
  StripeAccountNotFoundException
} from '@/errors';
import { LinkMapper } from '@/mappers/links';
import { DomainModel } from '@/models/domain.model';
import { CreateAppStripeAccountService } from '@/services/apps/create-app-stripe-account';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { FindAppCurrentPlanService } from '@/services/apps/find-app-current-plan';
import { CreateStripeAccountOnboardingLinkService } from '@/services/stripe/create-stripe-account-onboarding-link';
import {
  mountStripeAccountOnboardingRefreshURL,
  mountStripeAccountOnboardingReturnURL
} from '@/utils/mount-stripe-account-onboarding-response-url';

type CreateAppStripeAccountOnboardingLinkCommandKeys =
  keyof CreateAppStripeAccountOnboardingLinkCommand;

@CommandHandler(CreateAppStripeAccountOnboardingLinkCommand)
export class CreateAppStripeAccountOnboardingLinkCommandHandler
  implements ICommandHandler<CreateAppStripeAccountOnboardingLinkCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAppCurrentPlanService: FindAppCurrentPlanService,
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService,
    private readonly createAppStripeAccountService: CreateAppStripeAccountService,
    private readonly createStripeAccountOnboardingLinkService: CreateStripeAccountOnboardingLinkService
  ) {}

  async execute(command: CreateAppStripeAccountOnboardingLinkCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppStripeAccountOnboardingLinkCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    if (app.isStokei) {
      throw new AppUnauthorizedException();
    }
    const appPlan = await this.findAppCurrentPlanService.execute(app.id);
    if (appPlan?.type !== PlanType.FREE) {
      throw new PlanUnauthorizedException();
    }

    let stripeAccount = app.stripeAccount;
    if (!stripeAccount) {
      const appWithStripeAccount =
        await this.createAppStripeAccountService.execute({
          app: app.id,
          createdBy: data.createdBy
        });
      if (!appWithStripeAccount?.stripeAccount) {
        throw new StripeAccountNotFoundException();
      }
      stripeAccount = appWithStripeAccount.stripeAccount;
    }

    let appDomain: DomainModel;
    try {
      appDomain = await this.findAppCurrentDomainService.execute(app.id);
    } catch (error) {
      appDomain = null;
    }

    const link = await this.createStripeAccountOnboardingLinkService.execute({
      refreshUrl: mountStripeAccountOnboardingRefreshURL({
        domain: appDomain?.url
      }),
      returnUrl: mountStripeAccountOnboardingReturnURL({
        domain: appDomain?.url
      }),
      stripeAccount
    });
    if (!link) {
      throw new AppNotFoundException();
    }
    return new LinkMapper().toModel(link);
  }

  private clearData(
    command: CreateAppStripeAccountOnboardingLinkCommand
  ): CreateAppStripeAccountOnboardingLinkCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
