import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { QuizComponent } from './quiz/quiz.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'quiz/:id',
                component: QuizComponent,
            },
        ]),
    ],
    declarations: [
        DashboardComponent,
        QuizComponent,
    ],
})
export class DashboardModule {}
