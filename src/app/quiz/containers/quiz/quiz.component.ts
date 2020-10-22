import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';

import { Mode, QuestionStatus, QuizType } from '../../enums';
import { Pager, Quiz, QuizConfig, QuizPath } from '../../models';
import { QuizService } from '../../services/quiz.service';
import { components } from '../../components';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
    quizes: QuizPath[];
    Mode = Mode;
    QuestionStatus = QuestionStatus;
    mode: Mode = Mode.quiz;
    quizPath: string;
    quizColor: string;
    quiz: Quiz = new Quiz(null);
    config: QuizConfig = {
        allowBack: true,
        allowReview: true,
        autoMove: false,
        duration: 120,
        pageSize: 1,
        requiredAll: false,
        richText: false,
        shuffleQuestions: false,
        shuffleOptions: false,
        showClock: false,
        showPager: true,
        theme: 'none',
    };
    pager: Pager = {
        index: 0,
        size: 1,
        count: 1,
    };
    timer: any = null;
    startTime: Date;
    ellapsedTime: string = '00:00';
    duration: string = '';
    quizNotFound = false;

    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute,
        private renderer: Renderer2
    ) {
        this.renderer.removeClass(document.body, 'dashboard-background');
    }

    ngOnInit() {
        const quizTypeId: QuizType = +this.route.snapshot.params['id'];

        this.quizes = this.quizService.getAll();

        const quiz = this.quizes.find((x: QuizPath) => x.quizType === quizTypeId);

        this.quizPath = quiz?.id ?? null;
        // TODO: Navigate to a 404 page
        this.quizNotFound = !this.quizPath;

        this.loadQuiz(this.quizPath);
    }

    loadQuiz(quizPath: string): void {
        this.quizService.get(quizPath).subscribe((data: Quiz) => {
            this.quiz = new Quiz(data);

            this.pager.count = this.quiz.questions.length;
            this.startTime = new Date();
            this.timer = setInterval(() => {
                this.tick();
            }, 1000);

            this.duration = this.parseTime(this.config.duration);

            this.quizColor = `-${
                this.quiz && this.quiz.name.toLowerCase().replace('.', '-')
            }`;
        });

        this.mode = Mode.quiz;
    }

    getImagePath(quizPath: string): string {
        const image = quizPath && quizPath.toLowerCase();

        if (image) {
            return `../../assets/images/${image}.png`;
        }

        return '';
    }

    navigate(index: number): void {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
            this.mode = Mode.quiz;
        }
    }

    onQuizSubmit(): void {
        const answers = [];

        this.quiz.questions.forEach((x) =>
            answers.push({
                quizId: this.quiz.id,
                questionId: x.id,
                answered: x.answered,
            })
        );

        this.mode = Mode.result;
    }

    private tick(): void {
        const now = new Date();
        const diff = (now.getTime() - this.startTime.getTime()) / 1000;

        if (diff >= this.config.duration) {
            this.onQuizSubmit();
        }

        this.ellapsedTime = this.parseTime(diff);
    }

    private parseTime(totalSeconds: number): string {
        let mins: string | number = Math.floor(totalSeconds / 60);
        let secs: string | number = Math.round(totalSeconds % 60);

        mins = (mins < 10 ? '0' : '') + mins;
        secs = (secs < 10 ? '0' : '') + secs;

        return `${mins}:${secs}`;
    }
}
