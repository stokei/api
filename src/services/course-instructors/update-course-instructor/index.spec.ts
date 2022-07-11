import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCourseInstructorService } from '.';

describe('UpdateCourseInstructorService', () => {
  let updateCourseInstructorService: UpdateCourseInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCourseInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCourseInstructorService = modRef.get(UpdateCourseInstructorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCourseInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
