import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuizModule } from './quiz/quiz.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        QuizModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
