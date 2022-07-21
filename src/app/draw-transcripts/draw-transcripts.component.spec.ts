import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawTranscriptsComponent } from './draw-transcripts.component';

describe('DrawTranscriptsComponent', () => {
  let component: DrawTranscriptsComponent;
  let fixture: ComponentFixture<DrawTranscriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawTranscriptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawTranscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
