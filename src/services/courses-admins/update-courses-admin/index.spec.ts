import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCoursesAdminService } from '.';

describe('UpdateCoursesAdminService', () => {
  let updateCoursesAdminService: UpdateCoursesAdminService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCoursesAdminService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCoursesAdminService = modRef.get(UpdateCoursesAdminService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCoursesAdminService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
