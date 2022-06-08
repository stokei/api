import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemovePaymentService } from '.';

describe('RemovePaymentService', () => {
  let removePaymentService: RemovePaymentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePaymentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePaymentService = modRef.get(RemovePaymentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePaymentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
