import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/model/Utilisateur';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {

  constructor(private readonly dialogRef: DialogRef) { }

  ngOnInit(): void {}
  closeClick(result?: Utilisateur): void {
    this.dialogRef.close(result);
  }
}
