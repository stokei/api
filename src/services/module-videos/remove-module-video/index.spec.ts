import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveModuleVideoService } from '.';

describe('RemoveModuleVideoService', () => {
  let removeModuleVideoService: RemoveModuleVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveModuleVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeModuleVideoService = modRef.get(RemoveModuleVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeModuleVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
