import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static cannotContainsEmptySpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as String).indexOf(" ") >= 0) {
            return { cannotContainsEmptySpace: true }
        }

        return null;
    }
}

export function RemoveWhiteSpaces(name) {
    return name.split(/\s+/).join(' ').trim();
}
