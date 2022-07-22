import { Component, OnInit } from '@angular/core';
import { DataService, geneData } from '../data.service';

@Component({
  selector: 'app-draw-transcripts',
  templateUrl: './draw-transcripts.component.html',
  styleUrls: ['./draw-transcripts.component.css']
})
export class DrawTranscriptsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  public data: geneData = this.dataService.getDataContents();

  public scale: number = 0;

  ngOnInit(): void {
    this.scale=this.dataService.getScale();
  }

  switchData(): void {
    this.dataService.switchData();
    this.data = this.dataService.getDataContents();
    this.scale = this.dataService.getScale();
  }

}
