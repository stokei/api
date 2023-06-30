import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BaseCronJob } from '@/common/base-cron-job';
import { defaultAccountId } from '@/constants/default-account-id';
import { DomainStatus } from '@/enums/domain-status.enum';
import { IS_PRODUCTION } from '@/environments';
import { FindAllDomainsRepository } from '@/repositories/domains/find-all-domains';
import { ActivateDomainService } from '@/services/domains/activate-domain';
import { CheckVercelDomainService } from '@/services/vercel/check-vercel-domain';

@Injectable()
export class CheckDomainCronJob implements BaseCronJob {
  private readonly logger = new Logger(CheckDomainCronJob.name);
  constructor(
    private readonly activateDomainService: ActivateDomainService,
    private readonly checkVercelDomainService: CheckVercelDomainService,
    private readonly findAllDomainsRepository: FindAllDomainsRepository
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async execute(): Promise<void> {
    try {
      const domains = await this.findAllDomainsRepository.execute({
        where: {
          NOT: {
            status: DomainStatus.ACTIVE
          }
        }
      });
      if (!!domains?.length) {
        await Promise.all(
          domains.map(async (domain) => {
            try {
              let verified = false;
              if (!IS_PRODUCTION) {
                verified = true;
              } else {
                const vercelCheck = await this.checkVercelDomainService.execute(
                  {
                    name: domain.name
                  }
                );
                verified = !!vercelCheck?.verified;
              }
              if (!!verified) {
                await this.activateDomainService.execute({
                  domain: domain.id,
                  updatedBy: defaultAccountId,
                  app: domain.app
                });
              }
            } catch (error) {}
          })
        );
      }
    } catch (error) {}
    this.logger.log(`Run ${CheckDomainCronJob.name}.`);
  }
}
