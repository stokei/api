import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomModuleService } from '.';

describe('RemoveClassroomModuleService', () => {
  let removeClassroomModuleService: RemoveClassroomModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomModuleService = modRef.get(RemoveClassroomModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
