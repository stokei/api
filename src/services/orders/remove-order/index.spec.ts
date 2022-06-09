import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveOrderService } from '.';

describe('RemoveOrderService', () => {
  let removeOrderService: RemoveOrderService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveOrderService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeOrderService = modRef.get(RemoveOrderService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeOrderService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
