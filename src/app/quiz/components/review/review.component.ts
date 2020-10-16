import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Question, Quiz } from '../../models';
import { QuestionStatus } from '../../enums';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
    @Input() quiz: Quiz;
    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

    QuestionStatus = QuestionStatus;

    isAnswered(question: Question): string {
        return question.options.find((x) => x.selected)
            ? QuestionStatus.Answered
            : QuestionStatus.NotAnswered;
    }

    navigate(index: number): void {
        this.goTo.emit(index);
    }
}
