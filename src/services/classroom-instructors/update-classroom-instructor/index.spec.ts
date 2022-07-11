import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateClassroomInstructorService } from '.';

describe('UpdateClassroomInstructorService', () => {
  let updateClassroomInstructorService: UpdateClassroomInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomInstructorService = modRef.get(
      UpdateClassroomInstructorService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
