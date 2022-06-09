import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomsEnrollmentService } from '.';

describe('CreateClassroomsEnrollmentService', () => {
  let createClassroomsEnrollmentService: CreateClassroomsEnrollmentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsEnrollmentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsEnrollmentService = modRef.get(
      CreateClassroomsEnrollmentService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsEnrollmentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
