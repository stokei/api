import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreatePaymentsMethodService } from '.';

describe('CreatePaymentsMethodService', () => {
  let createPaymentsMethodService: CreatePaymentsMethodService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePaymentsMethodService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPaymentsMethodService = modRef.get(CreatePaymentsMethodService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPaymentsMethodService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
