import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkUnique(users: any[],property:string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;

    if (!Array.isArray(users)) {
      return null;
    }

    const res = users.some((user: any) => user[property] === email);

    if (res) {
      return { propertyExists: true };
    }

    return null;
  };
}

export function passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get("password")?.value;
  const confirmPassword = control.get('Confirmpassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMatch: true };
  }

  return null;
}
