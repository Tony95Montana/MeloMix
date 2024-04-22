import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { LecteurComponent } from './components/lecteur/lecteur.component';
import { ItemMusiqueComponent } from './components/item-musique/item-musique.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { AddPlaylistComponent } from './components/forms/add-playlist/add-playlist.component';
import { InscriptionComponent } from './components/forms/inscription/inscription.component';
import { ConnectionComponent } from './components/forms/connection/connection.component';
import { ToastrModule } from 'ngx-toastr';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ArtisteComponent } from './components/artiste/artiste.component';
import { StyleComponent } from './components/style/style.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LecteurComponent,
    ItemMusiqueComponent,
    SearchComponent,
    AddPlaylistComponent,
    InscriptionComponent,
    ConnectionComponent,
    PlaylistComponent,
    ArtisteComponent,
    StyleComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
