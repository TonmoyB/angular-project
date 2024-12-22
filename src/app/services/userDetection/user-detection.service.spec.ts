import { TestBed } from '@angular/core/testing';

import { UserDetectionService } from './user-detection.service';

describe('UserDetectionService', () => {
  let service: UserDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
