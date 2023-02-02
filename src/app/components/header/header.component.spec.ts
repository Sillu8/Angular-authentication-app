import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['logout'])
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method from AuthService', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
