import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveOrderItemService } from '.';

describe('RemoveOrderItemService', () => {
  let removeOrderItemService: RemoveOrderItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveOrderItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeOrderItemService = modRef.get(RemoveOrderItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeOrderItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
