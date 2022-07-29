import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateSubscriptionContractService } from '.';

describe('CreateSubscriptionContractService', () => {
  let createSubscriptionContractService: CreateSubscriptionContractService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateSubscriptionContractService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createSubscriptionContractService = modRef.get(
      CreateSubscriptionContractService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createSubscriptionContractService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
