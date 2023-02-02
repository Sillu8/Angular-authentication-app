import { TestBed } from '@angular/core/testing';

import { PublicRouteService } from './public-route.service';

describe('PublicRouteService', () => {
  let service: PublicRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
