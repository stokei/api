import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateCoursesInstructorService } from '.';

describe('UpdateCoursesInstructorService', () => {
  let updateCoursesInstructorService: UpdateCoursesInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCoursesInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCoursesInstructorService = modRef.get(UpdateCoursesInstructorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCoursesInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
