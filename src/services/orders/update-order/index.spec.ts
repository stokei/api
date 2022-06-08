import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateOrderService } from '.';

describe('UpdateOrderService', () => {
  let updateOrderService: UpdateOrderService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateOrderService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateOrderService = modRef.get(UpdateOrderService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateOrderService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
