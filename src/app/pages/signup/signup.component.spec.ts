import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let authService: AuthService;
  let formBuilder: FormBuilder;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService',['register']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();
    
    // Set email to something
    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();

    // Set email to something correct
    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.registerForm.controls['password'];

    // Password field is required
    password.setValue('')
    expect(password.hasError('required')).toBeTruthy();

    // Set password to something
    password.setValue('1234');
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeTruthy();


    password.setValue('12341234124');
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeFalsy();
    expect(password.hasError('maxlength')).toBeTruthy();
    expect(password.hasError('pattern')).toBeTruthy();

    // Set password to something not matching pattern
    password.setValue('password@1');
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeFalsy();
    expect(password.hasError('maxlength')).toBeFalsy();
    expect(password.hasError('pattern')).toBeTruthy();

    // Set password to matching conditions
    password.setValue('Pass@12');
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeFalsy();
    expect(password.hasError('maxlength')).toBeFalsy();
    expect(password.hasError('pattern')).toBeFalsy();
  });

  it('confirm password field validity', () => {
    const password = component.registerForm.controls['password'];

    // Confirm password field is required
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeFalsy();

    // Set confirm password and password differently
    password.setValue('pass123');
    confirmPassword.setValue('password1234');
    expect(confirmPassword.hasError('required')).toBeFalsy();
    expect(confirmPassword.hasError('mustMatch')).toBeTruthy();
    // component.registerForm.updateValueAndValidity();

    // Set confirm password equal to password
    password.setValue('Pass@12');
    confirmPassword.setValue('Pass@12');
    // component.registerForm.updateValueAndValidity();
    expect(confirmPassword.hasError('required')).toBeFalsy();
    expect(password.hasError('mustMatch')).toBeFalsy();
  });

  it('submitting a form calls register on the authService', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Pass@12');
    component.registerForm.controls['confirmPassword'].setValue('Pass@12');
    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();
    expect(authService.register).toHaveBeenCalledWith(
      'test@example.com',
      'Pass@12'
    );
  });
});
