import { Injectable } from '@angular/core';
import Diablo from '../resources/DIABLO.json';
import Phex from '../resources/PHEX.json';
import { Observable, of } from 'rxjs';

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

  public dataEntryNames: String[];

  private currentDataIndex: number;

  constructor() {
    this.dataEntries = [];
    this.dataEntryNames = [];
    this.dataEntries.push(Diablo);
    this.dataEntries.push(Phex);
    for (let i = 0; i < this.dataEntries.length; i++) {
      this.dataEntryNames.push(this.dataEntries[i].gene);
    }
    this.currentDataIndex = 1;
  }

  public getDataContents(): Observable<geneData>{
    return of(this.dataEntries[this.currentDataIndex]);
  }
  public switchData(name: string): void {
    for (let i = 0; i < this.dataEntries.length; i++) {
      if (this.dataEntries[i].gene == name) {
        this.currentDataIndex = i;
        break;
      }
    }
  }
  public getScale(): number{
    let max = 0;
    let reverse = true;

    if (this.dataEntries[this.currentDataIndex].transcripts[0].utr3[0].start < this.dataEntries[this.currentDataIndex].transcripts[0].utr5[0].stop) {
      reverse = false;
    }
    for (let j = 0; j < this.dataEntries[this.currentDataIndex].transcripts.length; j++) {
      if (reverse) {
        if (max < Math.abs(

          this.dataEntries[this.currentDataIndex].transcripts[j].utr3[
            this.dataEntries[this.currentDataIndex].transcripts[j].utr3.length - 1].stop
          - this.dataEntries[this.currentDataIndex].transcripts[j].utr5[0].start)

        ) {

          max = Math.abs(this.dataEntries[this.currentDataIndex].transcripts[j].utr3[
            this.dataEntries[this.currentDataIndex].transcripts[j].utr3.length - 1].stop
            - this.dataEntries[this.currentDataIndex].transcripts[j].utr5[0].start);

        }
      } else {
        if (max < Math.abs(

          this.dataEntries[this.currentDataIndex].transcripts[j].utr5[
            this.dataEntries[this.currentDataIndex].transcripts[j].utr5.length - 1].stop
          - this.dataEntries[this.currentDataIndex].transcripts[j].utr3[0].start)

        ) {

          max = Math.abs(this.dataEntries[this.currentDataIndex].transcripts[j].utr5[
            this.dataEntries[this.currentDataIndex].transcripts[j].utr5.length - 1].stop
            - this.dataEntries[this.currentDataIndex].transcripts[j].utr3[0].start);

        }
      }
    }
    console.log(max);
    console.log(reverse);
    return max;
  }
}
