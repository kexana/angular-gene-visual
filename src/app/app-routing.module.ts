import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranscriptCanvasComponent } from './transcript-canvas/transcript-canvas.component';
import { DrawTranscriptsComponent } from './draw-transcripts/draw-transcripts.component';

const routes: Routes = [
  { path: '', component: DrawTranscriptsComponent },
  { path: ':name', component: DrawTranscriptsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
