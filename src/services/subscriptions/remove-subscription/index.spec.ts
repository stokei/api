import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveSubscriptionService } from '.';

describe('RemoveSubscriptionService', () => {
  let removeSubscriptionService: RemoveSubscriptionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveSubscriptionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeSubscriptionService = modRef.get(RemoveSubscriptionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeSubscriptionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
