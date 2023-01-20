import { IChord, IScale } from './../types';
import { Component, OnInit } from '@angular/core';
import { ChordinateService } from '../chordinate.service';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  timeline: {scale: IScale, chord: IChord}[] = [];

  constructor(private _chordinateService: ChordinateService, private _firestore: Firestore) { }

  ngOnInit(): void {
    this._getCollection();
  }

  _getCollection(){
    const items = collection(this._firestore, 'tiemlines');
    // this.item$ = collectionData(items);
    collectionData(items).subscribe(res => console.log(res));
  }

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

  saveTimeline(){
    console.log(this.timeline);
  }

}
