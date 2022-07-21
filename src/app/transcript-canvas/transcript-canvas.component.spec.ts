import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptCanvasComponent } from './transcript-canvas.component';

describe('TranscriptCanvasComponent', () => {
  let component: TranscriptCanvasComponent;
  let fixture: ComponentFixture<TranscriptCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
