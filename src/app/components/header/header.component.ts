import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';
import { AddPlaylistComponent } from '../forms/add-playlist/add-playlist.component';
import { InscriptionComponent } from '../forms/inscription/inscription.component';
import { ConnectionComponent } from '../forms/connection/connection.component';
import { PlaylistService } from 'src/app/service/playlist.service';
import { PlaylistComponent } from '../playlist/playlist.component';

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

  constructor(private readonly dialog: Dialog, private readonly playService: PlaylistService) { }

  ngOnInit(): void {
    this.playService.getAllByUser(1).subscribe(res => {
      this.playlists = res;
    });
  }
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
    this.dialog.open(AddPlaylistComponent, {
      height: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    }).closed.subscribe((res: Playlist | unknown) => {
      if (res) {
        this.playlists.push(<Playlist>res);
      }
    });
  }
  openPlaylist(playlist: Playlist): void {
    this.dialog.open(PlaylistComponent, {
      height: '80vh',
      width: '80vw',
      panelClass: ['bg-white', 'rounded', 'p-3'],
      data: { playlist: playlist }
    });
  }
  connection(): void {
    this.dialog.open(ConnectionComponent, {
      height: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    });
  }
  inscription(): void {
    this.dialog.open(InscriptionComponent, {
      height: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    });
  }
}
