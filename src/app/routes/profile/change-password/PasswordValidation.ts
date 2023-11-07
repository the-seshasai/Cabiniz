import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('newpassword').value;
        if(AC.get('confirmpassword').touched || AC.get('confirmpassword').dirty) {
            let verifyPassword = AC.get('confirmpassword').value;

            if(password != verifyPassword) {
                AC.get('confirmpassword').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }
}