import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateModuleVideoService } from '.';

describe('UpdateModuleVideoService', () => {
  let updateModuleVideoService: UpdateModuleVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateModuleVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateModuleVideoService = modRef.get(UpdateModuleVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateModuleVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
