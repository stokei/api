import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveModulesVideoService } from '.';

describe('RemoveModulesVideoService', () => {
  let removeModulesVideoService: RemoveModulesVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveModulesVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeModulesVideoService = modRef.get(RemoveModulesVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeModulesVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
