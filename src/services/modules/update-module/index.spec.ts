import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateModuleService } from '.';

describe('UpdateModuleService', () => {
  let updateModuleService: UpdateModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateModuleService = modRef.get(UpdateModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
