import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    file!: File;
    newDeckFormLoading = false;

    dialogRef!: MatDialogRef<TemplateRef<any>>;

    decksList$: Observable<DeckViewModel[]> = this.filterControl.valueChanges.pipe(
        debounceTime(500),
        startWith(['']),
        concatMap(([seachValue])=> this.deckService.getDecks(seachValue || '')),
        map((decks) => decks.map((deck)=> {
            const imagesWithFullUrl = deck.files.map((img)=> this.getImageFullUrl(deck.name, img));
            return {
                name: deck.name,
                files: imagesWithFullUrl,
                imageIndex: 0
            }
        }))
    )

    newDeckForm = this.formBuilder.group({
        name: [null, Validators.required],
        deckFileName: [null, Validators.required]
    });

    @ViewChild('newDeckDialog', { static: true }) 
    newDeckDialog!: TemplateRef<any>;

    constructor(
        private readonly deckService: DeckService,
        private readonly dialog: MatDialog,
        private readonly formBuilder: FormBuilder
    ) {}

    openCreateDeckDialog() {
        this.dialogRef = this.dialog.open(this.newDeckDialog);
    }

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

    onFileSelected(event: Event) {
        const file = (event.currentTarget as HTMLInputElement).files?.[0];
        if (file) {
            this.newDeckForm.get('deckFileName')?.setValue(file.name);
            this.file = file;
        }
    }

    onNewDeckFormSubmitted() {
        const deckFormValue = this.newDeckForm.value;
        this.newDeckFormLoading = true;
        this.deckService.createDeck(deckFormValue.name, this.file).subscribe(()=> {
            this.newDeckFormLoading = false;
            this.dialogRef.close();
            this.filterControl.setValue('');
        });
    }

    private getImageFullUrl(deckName: string, imageName: string) {
        return `${environment.apiUrl}/${deckName}/${imageName}`;
    }

}