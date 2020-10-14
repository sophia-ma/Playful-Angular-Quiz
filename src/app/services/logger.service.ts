import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

export let isProduction = environment.production;

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    constructor() {}

    log(message: any): void {
        if (!isProduction) {
            return console.log(message);
        }
    }
}
