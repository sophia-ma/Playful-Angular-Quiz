import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: 'dashboard',
                component: fromContainers.DashboardComponent,
            },
            {
                path: 'quiz/:id',
                component: fromContainers.QuizComponent,
            },
        ]),
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
    ],
})
export class QuizModule {}
