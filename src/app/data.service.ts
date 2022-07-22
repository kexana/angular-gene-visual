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
    this.max = 0;
  }
  private max: number=0;
  public getScale(): number{
    for (let j = 0; j < this.dataEntries[this.currentDataIndex].transcripts.length; j++) {
      if (this.max < this.dataEntries[this.currentDataIndex].transcripts[j].cds[0].stop - this.dataEntries[this.currentDataIndex].transcripts[j].cds[0].start) {
        this.max = this.dataEntries[this.currentDataIndex].transcripts[j].cds[0].stop - this.dataEntries[this.currentDataIndex].transcripts[j].cds[0].start
        }
    }
    return this.max;
  }
}
