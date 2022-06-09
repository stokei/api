import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveCoursesAdminService } from '.';

describe('RemoveCoursesAdminService', () => {
  let removeCoursesAdminService: RemoveCoursesAdminService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCoursesAdminService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCoursesAdminService = modRef.get(RemoveCoursesAdminService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCoursesAdminService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
