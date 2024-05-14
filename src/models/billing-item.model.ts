import dayjs from 'dayjs';

export interface IBillingItemModelData {
  readonly price: string;
  readonly quantity: number;
  readonly total?: number;
  readonly unitAmount: number;
}

export class BillingItemModel {
  readonly price: string;
  readonly quantity: number;
  readonly total: number;
  readonly unitAmount: number;

  constructor(data: IBillingItemModelData) {
    this.price = data.price;
    this.quantity = data.quantity || 0;
    this.unitAmount = data.unitAmount || 0;
    this.total =
      data?.total ||
      this.calculateBillingToday(this.quantity * this.unitAmount);
  }

  calculateBillingToday = (amount: number) => {
    const now = dayjs(Date.now());
    const daysInMonth = now.daysInMonth();
    const todayDay = now.date();
    const percentageMonthComplete = todayDay / daysInMonth;
    if (!amount) {
      return 0;
    }
    return Math.round(amount * percentageMonthComplete);
  };
}
