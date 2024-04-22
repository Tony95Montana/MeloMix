import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Artiste } from 'src/app/model/Artiste';
import { ArtisteService } from 'src/app/service/artiste.service';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrl: './artiste.component.scss'
})
export class ArtisteComponent implements OnInit {
  artiste: Artiste;

  constructor(private readonly dialogRef: DialogRef, private readonly artisteService: ArtisteService) {
    this.artiste = dialogRef.config.data.artiste;
  }

  ngOnInit(): void {
    console.log(this.artiste);
    this.artisteService.getOne(this.artiste.id).subscribe(res => {
      console.log(res);
      this.artiste.Musique = res.Musique;
      console.log(this.artiste);
    });
  }
  closeClick(): void {
    this.dialogRef.close();
  }
}
