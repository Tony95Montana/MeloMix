import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  flagMenu = false;
  flagPlaylist = false;
  playlists: Playlist[] = [];
  @ViewChild("thisMenu") thisMenu!: ElementRef;
  @ViewChild("menuplaylist") menuplaylist!: ElementRef;

  constructor() { }

  ngOnInit(): void {}
  menu(): void {
    if (this.flagMenu) this.thisMenu.nativeElement.style.display = "none";
    else this.thisMenu.nativeElement.style.display = "flex";
    this.flagMenu = !this.flagMenu;
  }
  playlist(): void {
    if (this.flagPlaylist) this.menuplaylist.nativeElement.style.display = "none";
    else this.menuplaylist.nativeElement.style.display = "block";
    this.flagPlaylist = !this.flagPlaylist;
  }
}
