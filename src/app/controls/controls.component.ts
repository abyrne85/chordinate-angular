import { Component, OnInit } from '@angular/core';
import { Constants } from './../constants';
import { IChord, IScale } from '../types';
import { ChordinateService } from '../chordinate.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  majorScales!: IScale[];
  minorScales!: IScale[];
  chords!: IChord[];
  isChordSelected!: boolean;
  showSeventh: boolean = false;
  showNinth: boolean = false;


  constructor(private _chordinateService: ChordinateService) { }

  ngOnInit() {
    this._getScales();
  }

  _getScales() {
    this.majorScales = Constants.ALL_NOTES.map(key => ({ key, voice: 'major' }));
    this.minorScales = Constants.ALL_NOTES.map(key => ({ key, voice: 'minor' }));
  }

  selectKey(key: IScale) {
    [...this.majorScales, ...this.minorScales].forEach(s => s.selected = false);
    this._chordinateService.setKey(key);
    key.selected = true;
    this.isChordSelected = false;
    this._getChords(key);
  }

  _getChords(key: IScale) {
    this.chords = this._chordinateService.getChords(key);
  }

  selectChord(chord: IChord) {
    this.chords.forEach(c => c.selected = false);
    chord.selected = true;
    this._chordinateService.setChord(chord);
    this.isChordSelected = true;
  }

  showExtension() {
    this._chordinateService.setExtensions({
      seventh: this.showSeventh,
      ninth: this.showNinth
    });
  }


}
