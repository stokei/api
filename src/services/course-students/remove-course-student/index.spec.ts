import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCourseStudentService } from '.';

describe('RemoveCourseStudentService', () => {
  let removeCourseStudentService: RemoveCourseStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCourseStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCourseStudentService = modRef.get(RemoveCourseStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCourseStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
