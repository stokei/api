import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateModulesMaterialService } from '.';

describe('UpdateModulesMaterialService', () => {
  let updateModulesMaterialService: UpdateModulesMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateModulesMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateModulesMaterialService = modRef.get(UpdateModulesMaterialService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateModulesMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
