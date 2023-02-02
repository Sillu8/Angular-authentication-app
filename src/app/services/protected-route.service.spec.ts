import { TestBed } from '@angular/core/testing';
import { FirebaseAppModule } from '@angular/fire/app';

import { ProtectedRouteService } from './protected-route.service';

describe('ProtectedRouteService', () => {
  let service: ProtectedRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: []
    });
    service = TestBed.inject(ProtectedRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
