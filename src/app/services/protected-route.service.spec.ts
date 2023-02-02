import { TestBed } from '@angular/core/testing';

import { ProtectedRouteService } from './protected-route.service';

describe('ProtectedRouteService', () => {
  let service: ProtectedRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectedRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
