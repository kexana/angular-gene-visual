import { Component,Input, ViewChild, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import { node, transcript } from '../data.service';

@Component({
  selector: 'app-transcript-canvas',
  templateUrl: './transcript-canvas.component.html',
  styleUrls: ['./transcript-canvas.component.css'],
  //template: `<canvas #transcriptCanvas></canvas>`
})
export class TranscriptCanvasComponent implements AfterViewInit {
  @Input('transcript') transcript: transcript;

  @ViewChild('transcriptCanvas')
  private transcriptCanvas: ElementRef;

  public context: CanvasRenderingContext2D;

  constructor() {
    this.transcriptCanvas = {} as ElementRef;
    this.context = {} as CanvasRenderingContext2D;
    this.transcript = {} as transcript;
  }

  ngAfterViewInit(): void {
    this.context = this.transcriptCanvas.nativeElement.getContext('2d');
    this.DrawTranscript();
  }

  private intronWidth = 4;
  private exonWidth = 16;
  private exonScale =0;
  private strandLength = 0;

  DrawTranscript(): void {
    this.context.canvas.width = window.innerWidth - 300;
    this.strandLength = this.transcript.cds[0].stop - this.transcript.cds[0].start;
    this.exonScale = this.strandLength / this.context.canvas.width * 40000;

    //diablo *40000

    console.log(this.exonScale);

    this.context.fillRect(0, this.context.canvas.height / 2 - this.intronWidth / 2, this.context.canvas.width, this.intronWidth);
    for (let i = 0; i < this.transcript.exons.length; i++) {
      this.context.fillRect(this.transcript.exons[i].start / this.exonScale*(i), this.context.canvas.height / 2 - this.exonWidth / 2, (this.transcript.exons[i].stop - this.transcript.exons[i].start) / (this.exonScale/100000), this.exonWidth);
    }
  }
}


