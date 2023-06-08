import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const cleanedValue = value.replace(/\D/g, '');
    const countryCode = cleanedValue.slice(0, 2);
    const areaCode = cleanedValue.slice(2, 5);
    const firstPart = cleanedValue.slice(5, 7);
    const secondPart = cleanedValue.slice(7, 9);
    const thirdPart = cleanedValue.slice(9, 11);

    return `+${countryCode} (${areaCode})-${firstPart}-${secondPart}-${thirdPart}`;
  }
}
