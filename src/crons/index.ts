import { CheckDomainCronJob } from './check-domains';
import { CheckSubscriptionContractsCronJob } from './check-subscription-contracts';

export const CronJobs = [CheckDomainCronJob, CheckSubscriptionContractsCronJob];
