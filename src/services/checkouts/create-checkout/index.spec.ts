import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateCheckoutService } from '.';

describe('CreateCheckoutService', () => {
  let createCheckoutService: CreateCheckoutService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCheckoutService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCheckoutService = modRef.get(CreateCheckoutService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCheckoutService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
