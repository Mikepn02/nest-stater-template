import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import PasswordValidator from 'password-validator';

const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8)
  .is()
  .max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

@ValidatorConstraint({ async: false })
export class PasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const result = passwordSchema.validate(value, { list: true }); // returns string[]
    return Array.isArray(result) ? result.length === 0 : result === true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Password must be 8-30 chars, include uppercase, lowercase, digit, symbol, and no spaces';
  }
}

export function ValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordConstraint,
    });
  };
}
