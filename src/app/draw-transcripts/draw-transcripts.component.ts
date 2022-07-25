import { Component, OnInit } from '@angular/core';
import { DataService, geneData } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-draw-transcripts',
  templateUrl: './draw-transcripts.component.html',
  styleUrls: ['./draw-transcripts.component.css']
})
export class DrawTranscriptsComponent implements OnInit {
  
  public data: geneData;

  public scale: number = 0;

  constructor(public dataService: DataService) {
    this.data = {} as geneData;
  }

  ngOnInit(): void {
    this.scale = this.dataService.getScale();
    this.linkData();
  }


  linkData(): void {
    this.dataService.getDataContents().subscribe(data => this.data = data);
  }

  switchData(name: string): void {
    this.dataService.switchData(name);
    this.linkData();
    this.scale = this.dataService.getScale();
  }

}
