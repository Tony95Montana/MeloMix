import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';
import { AddPlaylistComponent } from '../forms/add-playlist/add-playlist.component';
import { InscriptionComponent } from '../forms/inscription/inscription.component';
import { ConnectionComponent } from '../forms/connection/connection.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  flagMenu = false;
  flagMenu2 = false;
  flagPlaylist = false;
  flagConnecter = false;
  playlists: Playlist[] = [];
  @ViewChild("thisMenu") thisMenu!: ElementRef;
  @ViewChild("thisMenu2") thisMenu2!: ElementRef;
  @ViewChild("menuplaylist") menuplaylist!: ElementRef;

  constructor(private readonly dialog: Dialog) { }

  ngOnInit(): void {}
  menu(): void {
    if (this.flagMenu) this.thisMenu.nativeElement.style.display = "none";
    else this.thisMenu.nativeElement.style.display = "flex";
    this.flagMenu = !this.flagMenu;
  }
  menu2(): void {
    if (this.flagMenu2) this.thisMenu2.nativeElement.style.display = "none";
    else this.thisMenu2.nativeElement.style.display = "flex";
    this.flagMenu2 = !this.flagMenu2;
  }
  playlist(): void {
    if (this.flagPlaylist) this.menuplaylist.nativeElement.style.display = "none";
    else this.menuplaylist.nativeElement.style.display = "block";
    this.flagPlaylist = !this.flagPlaylist;
  }
  createPlaylist(): void {
    let dialogRef = this.dialog.open(AddPlaylistComponent, {
      height: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    });
  }
  connection(): void {
    let dialogRef = this.dialog.open(ConnectionComponent, {
      height: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    });
  }
  inscription(): void {
    let dialogRef = this.dialog.open(InscriptionComponent, {
      height: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    });
  }
}
