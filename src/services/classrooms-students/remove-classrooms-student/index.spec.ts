import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomsStudentService } from '.';

describe('RemoveClassroomsStudentService', () => {
  let removeClassroomsStudentService: RemoveClassroomsStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsStudentService = modRef.get(RemoveClassroomsStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
