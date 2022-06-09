import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateOrdersItemService } from '.';

describe('UpdateOrdersItemService', () => {
  let updateOrdersItemService: UpdateOrdersItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateOrdersItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateOrdersItemService = modRef.get(UpdateOrdersItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateOrdersItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
