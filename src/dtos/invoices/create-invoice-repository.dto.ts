import { CreateInvoiceDTO } from './create-invoice.dto';

export interface CreateInvoiceRepositoryDTO extends CreateInvoiceDTO {
  active: boolean;
}
