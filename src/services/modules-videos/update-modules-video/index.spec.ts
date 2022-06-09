import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateModulesVideoService } from '.';

describe('UpdateModulesVideoService', () => {
  let updateModulesVideoService: UpdateModulesVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateModulesVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateModulesVideoService = modRef.get(UpdateModulesVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateModulesVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
