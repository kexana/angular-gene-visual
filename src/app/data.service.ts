import { Injectable } from '@angular/core';
import Diablo from '../resources/DIABLO.json';
import Phex from '../resources/PHEX.json';

export interface node {
  start: number;
  stop: number;
}
export interface transcript {
  transcript_id: string;
  strand: string;
  chrom: string,
  cds: node[];
  utr3: node[];
  utr5: node[];
  exons: node[];
}

export interface geneData {
  gene: string;
  transcripts: transcript[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataEntries: geneData[];

  private currentDataIndex: number;

  constructor() {
    this.dataEntries = [];
    this.dataEntries.push(Diablo);
    this.dataEntries.push(Phex);
    this.currentDataIndex = 1;
  }

  public getDataContents(): geneData{
    return this.dataEntries[this.currentDataIndex];
  }
  public switchData(): void {
    if (this.currentDataIndex < this.dataEntries.length-1 ) {
      this.currentDataIndex += 1;
    } else {
      this.currentDataIndex = 0;
    }
  }
}
