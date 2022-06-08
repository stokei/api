import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveCoursesInstructorService } from '.';

describe('RemoveCoursesInstructorService', () => {
  let removeCoursesInstructorService: RemoveCoursesInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCoursesInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCoursesInstructorService = modRef.get(RemoveCoursesInstructorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCoursesInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
