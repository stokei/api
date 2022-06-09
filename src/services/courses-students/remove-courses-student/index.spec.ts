import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCoursesStudentService } from '.';

describe('RemoveCoursesStudentService', () => {
  let removeCoursesStudentService: RemoveCoursesStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCoursesStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCoursesStudentService = modRef.get(RemoveCoursesStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCoursesStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
