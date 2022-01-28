import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeckHomeComponent } from './pages/deck-home.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DeckHomeComponent
            }
        ]),
        CommonModule
    ],
    declarations: [
        DeckHomeComponent
    ]
})
export class DeckModule {

}