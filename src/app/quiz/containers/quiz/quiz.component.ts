import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';

import { Option, Pager, Question, Quiz, QuizConfig, QuizPath } from '../../models';
import { Mode, QuestionStatus } from '../../enums';
import { LoggerService } from '../../services/logger.service';
import { QuizService } from '../../services/quiz.service';

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

    constructor(
        private quizService: QuizService,
        private logger: LoggerService,
        private route: ActivatedRoute,
        private renderer: Renderer2,
    ) {
        this.renderer.removeClass(document.body, 'dashboard-background');
    }

    ngOnInit() {
        const quizId = this.route.snapshot.params['id'];

        this.quizes = this.quizService.getAll();
        this.quizPath = this.quizes[quizId].id;

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

    navigate(index: number): void {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
            this.mode = Mode.quiz;
        }
    }

    isCorrect(question: Question): string {
        return question.options.every((x) => x.selected === x.isAnswer)
            ? 'correct'
            : 'wrong';
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

        this.logger.log(this.quiz.questions);
        this.mode = Mode.result;
    }

    get filteredQuestions(): Question[] {
        return this.quiz.questions
            ? this.quiz.questions.slice(
                  this.pager.index,
                  this.pager.index + this.pager.size
              )
            : [];
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
