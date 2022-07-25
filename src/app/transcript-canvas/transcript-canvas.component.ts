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
  @Input('scale') globalScale: number;

  @ViewChild('transcriptCanvas')
  private transcriptCanvas: ElementRef;

  public context: CanvasRenderingContext2D;

  constructor() {
    this.transcriptCanvas = {} as ElementRef;
    this.context = {} as CanvasRenderingContext2D;
    this.transcript = {} as transcript;
    this.globalScale = 0;
  }

  ngAfterViewInit(): void {
    this.context = this.transcriptCanvas.nativeElement.getContext('2d');
    this.DrawTranscript();
  }

  private intronWidth = 2;
  private exonWidth = 16;
  private utrWidth = 8;

  private exonScale = 0;
  
  private startOffset = 0;

  private signMultiplier=1;

  DrawTranscript(): void {
    this.context.canvas.width = window.innerWidth - 150;
    if (this.transcript.utr3[0].start < this.transcript.utr5[0].stop) {
      this.startOffset = this.transcript.utr3[0].start - 1500;
      this.signMultiplier = 1;
    } else {
      this.startOffset = this.transcript.utr5[0].start - 1500;
      this.signMultiplier = -1;
    }
    this.exonScale = this.context.canvas.width / (this.globalScale*1.1);

    this.context.fillRect(0, this.context.canvas.height / 2 - this.intronWidth / 2, this.context.canvas.width, this.intronWidth);
    for (let i = 0; i < this.transcript.exons.length; i++) {
      this.context.fillStyle = "000000";
      this.context.fillRect((this.transcript.exons[i].start - this.startOffset) * this.exonScale, this.context.canvas.height / 2 - this.exonWidth / 2, (this.transcript.exons[i].stop - this.transcript.exons[i].start) * this.exonScale, this.exonWidth);
    }
    for (let i = 0; i < this.transcript.utr3.length; i++) {
      this.context.fillStyle = "#9a1e73";
      this.context.fillRect((this.transcript.utr3[i].start - this.startOffset - (this.transcript.utr3[i].stop - this.transcript.utr3[i].start) * this.signMultiplier) * this.exonScale, this.context.canvas.height / 2 - this.utrWidth / 2, (this.transcript.utr3[i].stop - this.transcript.utr3[i].start) * this.exonScale, this.utrWidth);
    }
    for (let i = 0; i < this.transcript.utr5.length; i++) {
      this.context.fillStyle = "#9a1e73";
      this.context.fillRect((this.transcript.utr5[i].start - this.startOffset + (this.transcript.utr5[i].stop - this.transcript.utr5[i].start) * this.signMultiplier) * this.exonScale, this.context.canvas.height / 2 - this.utrWidth / 2, (this.transcript.utr5[i].stop - this.transcript.utr5[i].start) * this.exonScale, this.utrWidth);
    }
  }
}


