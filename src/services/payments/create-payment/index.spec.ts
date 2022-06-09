import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreatePaymentService } from '.';

describe('CreatePaymentService', () => {
  let createPaymentService: CreatePaymentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePaymentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPaymentService = modRef.get(CreatePaymentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPaymentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
