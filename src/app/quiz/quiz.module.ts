import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import * as fromContainers from './containers';
import * as fromComponents from './components';

export const ROUTES: Routes = [
    {
        path: 'dashboard',
        component: fromContainers.DashboardComponent,
    },
    {
        path: 'quiz/:id',
        component: fromContainers.QuizComponent,
    },
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
    ],
})
export class QuizModule {}
