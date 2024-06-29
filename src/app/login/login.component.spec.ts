import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a form initialized', () => {
    expect(component.loginform).toBeDefined();
  });

  it('should have email and password controls', () => {
    expect(component.loginform.contains('email')).toBeTruthy();
    expect(component.loginform.contains('password')).toBeTruthy();
  });

  it('should make email control required', () => {
    let control = component.loginform.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should make password control required', () => {
    let control = component.loginform.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should enforce minimum length for email control', () => {
    let control = component.loginform.get('email');
    control?.setValue('abc');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['minlength']).toBeTruthy();
  });

  it('should enforce maximum length for email control', () => {
    let control = component.loginform.get('email');
    control?.setValue('abcdefghijk');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['maxlength']).toBeTruthy();
  });

  it('should enforce minimum length for password control', () => {
    let control = component.loginform.get('password');
    control?.setValue('abc');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['minlength']).toBeTruthy();
  });

  it('should enforce maximum length for password control', () => {
    let control = component.loginform.get('password');
    control?.setValue('abcdefghijk');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['maxlength']).toBeTruthy();
  });

  it('should log form value on login', () => {
    spyOn(console, 'log');
    component.loginform.setValue({ email: 'test@test.com', password: 'password' });
    component.login();
    expect(console.log).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
  });

});
