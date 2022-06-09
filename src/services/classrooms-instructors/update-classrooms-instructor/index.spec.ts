import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateClassroomsInstructorService } from '.';

describe('UpdateClassroomsInstructorService', () => {
  let updateClassroomsInstructorService: UpdateClassroomsInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsInstructorService = modRef.get(
      UpdateClassroomsInstructorService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
