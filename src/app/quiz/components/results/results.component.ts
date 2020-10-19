import { Component, Input } from '@angular/core';

import { Question } from '../../models';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
    @Input() questions: Question;

    isCorrect(question: Question): string {
        return question.options.every((x) => x.selected === x.isAnswer)
            ? 'correct'
            : 'wrong';
    }
}
