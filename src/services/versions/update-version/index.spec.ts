import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateVersionService } from '.';

describe('UpdateVersionService', () => {
  let updateVersionService: UpdateVersionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVersionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVersionService = modRef.get(UpdateVersionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVersionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
