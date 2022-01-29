import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concatMap, debounceTime, map, Observable, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeckService } from '../services/deck.service';

type DeckViewModel = {
    name: string;
    files: string[];
    imageIndex: number;
}

@Component({
    selector: 'deck-home',
    styleUrls: ['./deck-home.component.scss'],
    templateUrl: './deck-home.component.html'
})
export class DeckHomeComponent {

    filterControl = new FormControl('');

    decksList$: Observable<DeckViewModel[]> = this.filterControl.valueChanges.pipe(
        debounceTime(500),
        startWith(''),
        concatMap((seachValue)=> this.deckService.getDecks(seachValue)),
        map((decks) => decks.map((deck)=> {
            const imagesWithFullUrl = deck.files.map((img)=> this.getImageFullUrl(deck.name, img));
            return {
                name: deck.name,
                files: imagesWithFullUrl,
                imageIndex: 0
            }
        }))
    )

    constructor(
        private readonly deckService: DeckService
    ) {}

    nextImage(deckModel: DeckViewModel) {
        if (deckModel.imageIndex === deckModel.files.length - 1) {
            deckModel.imageIndex = 0;
        } else {
            deckModel.imageIndex++;
        }
    }

    prevImage(deckModel: DeckViewModel) {
        if (deckModel.imageIndex === 0) {
            deckModel.imageIndex = deckModel.files.length - 1;
        } else {
            deckModel.imageIndex--;
        }
    }

    private getImageFullUrl(deckName: string, imageName: string) {
        return `${environment.apiUrl}/${deckName}/${imageName}`;
    }

}