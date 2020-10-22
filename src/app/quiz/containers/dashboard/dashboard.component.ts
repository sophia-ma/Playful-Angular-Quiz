import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { QuizType } from '../../enums';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    @ViewChild('react', { static: true }) reactRef: ElementRef;
    @ViewChild('angular', { static: true }) angularRef: ElementRef;
    @ViewChild('node', { static: true }) nodeRef: ElementRef;

    quiz: QuizType = QuizType.React;
    Quiz = QuizType;

    constructor(
        public router: Router,
        private renderer: Renderer2,
    ) {
        this.renderer.addClass(document.body, 'dashboard-background');
    }

    click(): void {
        if (this.reactRef.nativeElement.checked) {
            this.quiz = QuizType.React;
        }

        if (this.angularRef.nativeElement.checked) {
            this.quiz = QuizType.Angular;
        }

        if (this.nodeRef.nativeElement.checked) {
            this.quiz = QuizType.Node;
        }
    }

    startQuiz(): void {
        this.router.navigate(['quiz', this.quiz]);
    }
}
