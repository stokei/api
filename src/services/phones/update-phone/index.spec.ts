import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdatePhoneService } from '.';

describe('UpdatePhoneService', () => {
  let updatePhoneService: UpdatePhoneService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePhoneService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePhoneService = modRef.get(UpdatePhoneService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePhoneService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
