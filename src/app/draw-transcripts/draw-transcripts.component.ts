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

  ngOnInit(): void {
  }

  switchData(): void {
    this.dataService.switchData();
    this.data = this.dataService.getDataContents();
  }

}
