import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawTranscriptsComponent } from './draw-transcripts/draw-transcripts.component';
import { TranscriptCanvasComponent } from './transcript-canvas/transcript-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawTranscriptsComponent,
    TranscriptCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
