import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Option, Pager, Question, Quiz, QuizConfig } from '../../models';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
    @Input() quiz: Quiz;
    @Input() config: QuizConfig;
    @Input() pager: Pager;
    @Input() ellapsedTime: string = '00:00';
    @Input() duration: string = '';
    @Input() quizColor: string;
    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

    navigate(index: number): void {
        this.goTo.emit(index);
    }

    onQuestionSelect(question: Question, option: Option): void {
        if (question.questionTypeId === 1) {
            question.options.forEach((x) => {
                if (x.id !== option.id) {
                    x.selected = false;
                }
            });
        }

        if (this.config.autoMove) {
            this.navigate(this.pager.index + 1);
        }
    }

    get filteredQuestions(): Question[] {
        return this.quiz.questions
            ? this.quiz.questions.slice(
                  this.pager.index,
                  this.pager.index + this.pager.size
              )
            : [];
    }
}
