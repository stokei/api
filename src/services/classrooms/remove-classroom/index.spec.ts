import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomService } from '.';

describe('RemoveClassroomService', () => {
  let removeClassroomService: RemoveClassroomService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomService = modRef.get(RemoveClassroomService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
