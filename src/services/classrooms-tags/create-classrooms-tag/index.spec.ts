import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomsTagService } from '.';

describe('CreateClassroomsTagService', () => {
  let createClassroomsTagService: CreateClassroomsTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsTagService = modRef.get(CreateClassroomsTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
