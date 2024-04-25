import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';
import { AddPlaylistComponent } from '../forms/add-playlist/add-playlist.component';
import { InscriptionComponent } from '../forms/inscription/inscription.component';
import { ConnectionComponent } from '../forms/connection/connection.component';
import { PlaylistService } from 'src/app/service/playlist.service';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  navBar = "";
  flagMenu = false;
  flagMenu2 = false;
  flagPlaylist = false;
  flagConnecter = false;
  playlists: Playlist[] = [];
  currentUser: Utilisateur = {
    id: 0,
    email: "",
    nom: "",
    prenom: "",
    image: "",
    mdp: "",
    telephone: ""
  };
  @ViewChild("thisMenu") thisMenu!: ElementRef;
  @ViewChild("thisMenu2") thisMenu2!: ElementRef;
  @ViewChild("menuplaylist") menuplaylist!: ElementRef;

  constructor(private readonly utilisateurService: UtilisateurService, private readonly router: Router, private readonly dialog: Dialog, private readonly playService: PlaylistService) { }

  ngOnInit(): void {
    this.playService.getAllByUser(1).subscribe(res => {
      this.playlists = res;
    });
  }
  onEnter(): void {
    if (this.navBar != "") this.router.navigateByUrl('/recherche', { state: { query: this.navBar } });
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
    else {
      this.menuplaylist.nativeElement.style.display = "block";
      this.playService.getAllByUser(1).subscribe(res => {
        this.playlists = res;
      });
    }
    this.flagPlaylist = !this.flagPlaylist;
  }
  createPlaylist(): void {
    this.dialog.open(AddPlaylistComponent, {
      maxHeight: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    }).closed.subscribe((res: Playlist | unknown) => {
      if (res) {
        this.playlists.push(<Playlist>res);
      }
    });
  }
  openPlaylist(playlist: Playlist): void {
    this.menu();
    this.playlist();
    if (this.flagMenu2) this.menu2();
    this.dialog.open(PlaylistComponent, {
      maxHeight: '80vh',
      width: '80vw',
      panelClass: ['bg-white', 'rounded', 'p-3'],
      data: { playlist: playlist }
    }).closed.subscribe(() => {
      this.playService.getAllByUser(1).subscribe(res => {
        this.playlists = res;
      });
    });
  }
  connection(): void {
    this.dialog.open(ConnectionComponent, {
      maxHeight: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    }).closed.subscribe((res: any) => {
      if (res?.id != 0) {
        this.utilisateurService.getOne(res.id).subscribe(res => {
          this.currentUser = res;
        });
        this.flagConnecter = true;
      }
    });
  }
  deconnection(): void {
    this.flagConnecter = false;
    this.currentUser = {
      id: 0,
      email: "",
      nom: "",
      prenom: "",
      image: "",
      mdp: "",
      telephone: ""
    };
  }
  inscription(): void {
    this.menu2();
    if (this.flagMenu) this.menu();
    if (this.flagPlaylist) this.playlist();
    this.dialog.open(InscriptionComponent, {
      maxHeight: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3']
    }).closed.subscribe((res: Utilisateur | unknown) => {
      if (res) {
        this.flagConnecter = true;
        this.currentUser = <Utilisateur>res;
      }
    });
  }
}
