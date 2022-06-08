import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateCartService } from '.';

describe('CreateCartService', () => {
  let createCartService: CreateCartService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCartService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCartService = modRef.get(CreateCartService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCartService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
