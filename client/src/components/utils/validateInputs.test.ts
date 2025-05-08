import { renderHook, } from '@testing-library/react-hooks';
import { useValidateInputs } from './validateInput';

// newErrors.password at some point can be overwritten. We have cases when two errors can occur simultaneously
// but for the sake of simplicity we overwrite it here. You can create an [] to push errors. 
// but for now its ok - check line45 .toContaine('...')

describe('useValidateInputs', () => {
  it('should return no errors for empty form values', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: {} })
    );
    expect(result.current.formErrors).toEqual({});
  });

  it('should return error for invalid name', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { name: '   ' } })
    );
    result.current.validateInputs()
    expect(result.current.formErrors).toEqual({ name: 'Name is required.' });
  });

  it('should return error for invalid email', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { email: 'invalid' } })
    );
    result.current.validateInputs()
    expect(result.current.formErrors).toEqual({ email: 'Please enter a valid email address.' });
  });

  it('should return error for short password', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { password: 'short' } })
    );
    result.current.validateInputs()
    expect(result.current.formErrors).toEqual({ password: 'Password must be at least 6 characters long.' });
  });

  it('should return error for password without uppercase letter (register page)', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { password: 'password.', repeatPassword: 'password.' } })
    );
    result.current.validateInputs();
    expect(result.current.formErrors.password).toContain('Password must contain at least one uppercase letter.');
  });
  
  it('should return error for password without symbols (register page)', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { password: 'Password1', repeatPassword: 'Password1' } })
    );
    result.current.validateInputs();
    expect(result.current.formErrors.password).toContain('The password must include at least one of the following symbols: [!@#$%^&*(),.?":{}|<>]');
  });

  it('should return error for mismatched repeat password', () => {
    const { result } = renderHook(() =>
      // password should pass validation first
      useValidateInputs({ errors: {}, formValues: { password: 'Password.1', repeatPassword: 'different' } })
    );
    result.current.validateInputs()
    expect(result.current.formErrors).toEqual({ repeatPassword: 'Passwords do not match.' });
  });

  it('should return no errors for valid form values', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { name: 'John Doe', email: 'john@example.com', password: 'Password123)', repeatPassword: 'Password123)' } })
    );
    result.current.validateInputs()
    expect(result.current.formErrors).toEqual({});
  });

  it('should call validateInputs and return true for valid form values', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { name: 'John Doe', email: 'john@example.com', password: 'Password123)', repeatPassword: 'Password123)' } })
    );
    expect(result.current.validateInputs()).toBe(true);
  });

  it('should call validateInputs and return false for invalid form values', () => {
    const { result } = renderHook(() =>
      useValidateInputs({ errors: {}, formValues: { name: '   ', email: 'invalid', password: 'short', repeatPassword: 'different' } })
    );
    expect(result.current.validateInputs()).toBe(false);
  });
});