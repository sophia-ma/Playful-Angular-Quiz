import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

enum Quiz {
    React,
    Angular,
    Node,
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    @ViewChild('react') reactRef: ElementRef;
    @ViewChild('angular') angularRef: ElementRef;
    @ViewChild('node') nodeRef: ElementRef;

    quiz: Quiz = Quiz.React;
    Quiz = Quiz;

    constructor(
        public router: Router,
        private renderer: Renderer2,
    ) {
        this.renderer.addClass(document.body, 'dashboard-background');
    }

    click(): void {
        if (this.reactRef.nativeElement.checked) {
            this.quiz = Quiz.React;
        }

        if (this.angularRef.nativeElement.checked) {
            this.quiz = Quiz.Angular;
        }

        if (this.nodeRef.nativeElement.checked) {
            this.quiz = Quiz.Node;
        }
    }

    startQuiz(): void {
        this.router.navigate(['quiz', this.quiz]);
    }
}
