import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCoursesAdminService } from '.';

describe('CreateCoursesAdminService', () => {
  let createCoursesAdminService: CreateCoursesAdminService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCoursesAdminService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCoursesAdminService = modRef.get(CreateCoursesAdminService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCoursesAdminService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
