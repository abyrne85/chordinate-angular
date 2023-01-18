import { IChord, IScale } from './../types';
import { Component } from '@angular/core';
import { ChordinateService } from '../chordinate.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  timeline: {scale: IScale, chord: IChord}[] = [];
  constructor(private _chordinateService: ChordinateService) { }

  addToTimeline(){
    this.timeline.push({scale: this._chordinateService.selectedScale!, chord: this._chordinateService.selectedChord!});
  }

  isTimelineButtonDisabled(){
    return !this._chordinateService.selectedChord;
  }

  setChord(scale: IScale, chord: IChord){
    this._chordinateService.setKey(scale);
    this._chordinateService.setChord(chord);
  }
}
