import { Component } from '@angular/core';
import { DeckService } from '../services/deck.service';

@Component({
    selector: 'deck-home',
    styleUrls: ['./deck-home.component.scss'],
    templateUrl: './deck-home.component.html'
})
export class DeckHomeComponent {

    decksList$ = this.deckService.getDecks()

    constructor(
        private readonly deckService: DeckService
    ) {}


}