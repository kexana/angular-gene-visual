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
  private exonScale = 0;
  
  private startOffset = 0;

  DrawTranscript(): void {
    this.context.canvas.width = window.innerWidth - 150;
    this.startOffset = this.transcript.cds[0].start-1000;
    this.exonScale = this.context.canvas.width / (this.globalScale*1.1);

    this.context.fillRect(0, this.context.canvas.height / 2 - this.intronWidth / 2, this.context.canvas.width, this.intronWidth);
    for (let i = 0; i < this.transcript.exons.length; i++) {
      this.context.fillRect((this.transcript.exons[i].start - this.startOffset) * this.exonScale, this.context.canvas.height / 2 - this.exonWidth / 2, (this.transcript.exons[i].stop - this.transcript.exons[i].start) * this.exonScale, this.exonWidth);
    }
  }
}


