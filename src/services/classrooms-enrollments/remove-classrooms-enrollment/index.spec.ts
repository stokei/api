import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomsEnrollmentService } from '.';

describe('RemoveClassroomsEnrollmentService', () => {
  let removeClassroomsEnrollmentService: RemoveClassroomsEnrollmentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsEnrollmentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsEnrollmentService = modRef.get(
      RemoveClassroomsEnrollmentService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsEnrollmentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
