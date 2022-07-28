import { Component, OnInit } from '@angular/core';
import { DataService, geneData } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-draw-transcripts',
  templateUrl: './draw-transcripts.component.html',
  styleUrls: ['./draw-transcripts.component.css']
})
export class DrawTranscriptsComponent implements OnInit {
  
  public data: geneData;

  public scale: number = 0;


  constructor(public dataService: DataService, private route: ActivatedRoute, private location: Location) {
    this.data = {} as geneData;
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.switchData();
    });
  }

  linkData(name:String): void {
    this.dataService.getDataContents(name).subscribe(data => {
      this.data = data;
      this.dataService.dataEntry = data;
      this.dataService.getScale().subscribe(scale => this.scale = scale);
    });
  }

  switchData(): void {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.linkData(name);
  }

}
