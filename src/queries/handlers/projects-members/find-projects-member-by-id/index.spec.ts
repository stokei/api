import { Test } from '@nestjs/testing';

import { FindProjectsMemberByIdRepository } from '@/repositories/projects-members/find-projects-member-by-id';

import { FindProjectsMemberByIdQueryHandler } from '.';

describe('FindProjectsMemberByIdQueryHandler', () => {
  let findProjectsMemberByIdRepository: FindProjectsMemberByIdRepository;
  let findProjectsMemberByIdQueryHandler: FindProjectsMemberByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProjectsMemberByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProjectsMemberByIdQueryHandler
      ]
    }).compile();

    findProjectsMemberByIdRepository = moduleRef.get(
      FindProjectsMemberByIdRepository
    );
    findProjectsMemberByIdQueryHandler = moduleRef.get(
      FindProjectsMemberByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProjectsMemberByIdQueryHandler).toBeDefined();
    expect(findProjectsMemberByIdRepository).toBeDefined();
  });
});
