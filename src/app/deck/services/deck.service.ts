import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { DeckListItem } from "../models/deck.model";

const path = environment.apiUrl + '/decks';

@Injectable({
    providedIn: 'root'
})
export class DeckService {
    constructor(
        private readonly _httpClient: HttpClient
    ) {}

    getDecks(searchValue: string) {
        return this._httpClient.get<DeckListItem[]>(path, {
            params: {
                name: searchValue
            }
        });
    }
}