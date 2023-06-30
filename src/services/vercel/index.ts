import { CheckVercelDomainService } from './check-vercel-domain';
import { CreateVercelDomainService } from './create-vercel-domain';
import { DeleteVercelDomainService } from './delete-vercel-domain';

export const VercelServices = [
  CreateVercelDomainService,
  DeleteVercelDomainService,
  CheckVercelDomainService
];
