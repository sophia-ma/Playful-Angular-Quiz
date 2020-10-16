import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Quiz, QuizPath } from '../models';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    constructor(private http: HttpClient) {}

    get(url: string): Observable<Quiz> {
        return this.http.get<Quiz>(url);
    }

    getAll(): QuizPath[] {
        return [
            { id: 'data/react-quiz.json', name: 'React' },
            { id: 'data/angular-quiz.json', name: 'Angular' },
            { id: 'data/node-quiz.json', name: 'Node.js' },
        ];
    }
}
