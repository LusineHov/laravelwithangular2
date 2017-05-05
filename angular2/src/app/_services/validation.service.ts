import { Component, Input } from '@angular/core';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            // 'email': 'Incorrect email address!'
        };

        return config[validatorName];
    }

}
