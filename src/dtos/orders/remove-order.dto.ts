export interface RemoveOrderWhereDTO {
  removedBy: string;
  orderId: string;
}

export interface RemoveOrderDTO {
  where: RemoveOrderWhereDTO;
}
