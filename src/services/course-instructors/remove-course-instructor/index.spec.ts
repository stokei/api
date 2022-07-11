import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCourseInstructorService } from '.';

describe('RemoveCourseInstructorService', () => {
  let removeCourseInstructorService: RemoveCourseInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCourseInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCourseInstructorService = modRef.get(RemoveCourseInstructorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCourseInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
