import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomsModuleService } from '.';

describe('RemoveClassroomsModuleService', () => {
  let removeClassroomsModuleService: RemoveClassroomsModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsModuleService = modRef.get(RemoveClassroomsModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
