import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value;
       const passwordRepeat = AC.get('passwordRepeat').value;
       if ( password !== passwordRepeat ) {
            AC.get('passwordRepeat').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
