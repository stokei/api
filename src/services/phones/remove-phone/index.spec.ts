import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemovePhoneService } from '.';

describe('RemovePhoneService', () => {
  let removePhoneService: RemovePhoneService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePhoneService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePhoneService = modRef.get(RemovePhoneService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePhoneService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
