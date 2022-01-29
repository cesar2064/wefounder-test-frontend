import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeckHomeComponent } from './pages/deck-home.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DeckHomeComponent
            }
        ]),
        CommonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        DeckHomeComponent
    ]
})
export class DeckModule {

}