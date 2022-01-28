import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',   redirectTo: '/decks-home', pathMatch: 'full' },
  {
    path: 'decks-home',
    loadChildren: () => import('./deck/deck.module').then(m => m.DeckModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
