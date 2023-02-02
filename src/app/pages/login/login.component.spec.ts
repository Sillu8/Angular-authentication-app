import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  let formBuilder: FormBuilder;
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Set email to something
    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();

    // Set email to something correct
    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('password');
    expect(password.valid).toBeTruthy();
  });

  it('submitting a form calls auth service login', () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('test@test.com', 'password');
  });
});
