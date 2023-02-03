import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { ProtectedRouteService } from './protected-route.service';

fdescribe('ProtectedRouteService', () => {
  let service: ProtectedRouteService;
  let router: Router;
  const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
  const routerStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ProtectedRouteService],
      providers: [
        ProtectedRouteService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(ProtectedRouteService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
