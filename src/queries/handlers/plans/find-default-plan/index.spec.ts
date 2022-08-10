import { Test } from '@nestjs/testing';

import { FindDefaultPlanQueryHandler } from '.';

describe('FindDefaultPlanQueryHandler', () => {
  let findDefaultPlanQueryHandler: FindDefaultPlanQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [FindDefaultPlanQueryHandler]
    }).compile();

    findDefaultPlanQueryHandler = moduleRef.get(FindDefaultPlanQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findDefaultPlanQueryHandler).toBeDefined();
  });
});
