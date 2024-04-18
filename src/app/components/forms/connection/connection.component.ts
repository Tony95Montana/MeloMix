import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/model/Utilisateur';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent implements OnInit {

  constructor(private readonly dialogRef: DialogRef) {}

  ngOnInit(): void {}
  closeClick(result?: Utilisateur): void {
    this.dialogRef.close(result);
  }
}
