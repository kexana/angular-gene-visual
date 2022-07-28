import { Injectable } from '@angular/core';
//import Diablo from '../resources/DIABLO.json';
//import Phex from '../resources/PHEX.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  //private dataEntries: geneData[];

  public dataEntry: geneData;

  public dataEntryNames: String[];

  //private dataEntryCount: number;

  //private currentDataIndex: number;

  constructor(private httpClient: HttpClient) {
    //this.dataEntries = [];
    //this.dataEntries.push(Diablo);
    //this.dataEntries.push(Phex);
    //for (let i = 0; i < this.dataEntries.length; i++) {
    //  this.dataEntryNames.push(this.dataEntries[i].gene);
    //}
    this.dataEntry = {} as geneData;

    this.dataEntryNames = [];
    this.getDataEntryNames().subscribe(res => {
      this.dataEntryNames = res;
      console.log(this.dataEntryNames);
    });

    //this.dataEntryCount = 0;

   // this.currentDataIndex = 0;
  }
  public getDataContents(name: String): Observable<geneData> {
/*    for (let i = 0; i < this.dataEntryCount; i++) {
      if (this.dataEntries[i].gene == name) {
        this.currentDataIndex = i;
        break;
      }
    }*/
    //return of(this.dataEntries[this.currentDataIndex]);
    let namePath = name.toLowerCase();
    return this.httpClient.get<geneData>("http://127.0.0.1:8000/data/" + `${namePath}`);
  }
  public getDataEntryNames(): Observable<String[]> {
    return this.httpClient.get<String[]>("http://127.0.0.1:8000/getNames/");
  }
  public getScale(): Observable<number>{
    let max = 0;
    for (let j = 0; j < this.dataEntry.transcripts.length; j++) {
        
        if (max < Math.abs(

          this.dataEntry.transcripts[j].utr5[
            this.dataEntry.transcripts[j].utr5.length - 1].stop
          - this.dataEntry.transcripts[j].utr3[0].start)

        ) {

          max = Math.abs(this.dataEntry.transcripts[j].utr5[
            this.dataEntry.transcripts[j].utr5.length - 1].stop
            - this.dataEntry.transcripts[j].utr3[0].start);

        }
    }
    console.log(max);
    return of(max);
  }
}
