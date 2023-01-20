import { Constants } from './../constants';
import { Component, OnInit } from '@angular/core';
import { ITuning, IString, IChord, IFret } from '../types';
import { ChordinateService } from '../chordinate.service';
@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit {

  tuning: Array<ITuning> | undefined;
  strings: Array<IString> | undefined;

  selectedScale!: Array<string>;
  selectedChord: IChord | undefined;

  selectedTuningPreset: string[] | undefined;
  fretArray = new Array(12);

  tuningPresets = Constants.TUNINGS;
  constructor(private _chordinateService: ChordinateService) {}

  ngOnInit() {
    this.selectTuningPreset();
    this._handleKeySelection();
    this._handleChordSelection();
  }

  selectTuningPreset(tuning?: string[]){
    this.selectedTuningPreset = tuning || Constants.TUNINGS.Standard;
    this.tuning = this.selectedTuningPreset.map((key, id) => ({ id, key })).reverse();
    this.strings = this.selectedTuningPreset.map((key, id) => ({ id, key, frets: Array.apply(null, this.fretArray) })).reverse();
    this._populateFrets();
    this._tuneStrings();

    this._chordinateService.selectedScale && this._chordinateService.setKey(this._chordinateService.selectedScale);
    this._chordinateService.selectedChord && this._chordinateService.setChord(this._chordinateService.selectedChord);
  }

  _handleKeySelection(){
    this._chordinateService.scale$.subscribe((scale) => {
      const voice = scale.voice === 'major' ? Constants.MAJOR_SCALE : Constants.MINOR_SCALE;
      this.selectedScale = this._chordinateService.getNotesInScale(scale.key, voice);
      this.selectedChord = undefined;
      this._highlightFrets();
      this.selectedChord && this._highlightChord(this.selectedChord);
    });
  }

  _handleChordSelection(){
    this._chordinateService.chord$.subscribe((chord) => this._highlightChord(chord));
  }

  _highlightChord(chord: IChord){
    this.selectedChord = chord;
    this.strings!.forEach(s => (s.frets as IFret[]).forEach(f => {
      f.inChord = false;
      f.inChord =  this.selectedChord?.triad!.includes(f.key as string);
    }));
  }

  _highlightFrets(){
    this.strings!.forEach(s => (s.frets as IFret[]).forEach(f => {
      f.inChord = false;
      f.inScale = false;
      f.inScale = this.selectedScale?.includes(f.key as string)
    }));
  }

  _populateFrets() {
    this.strings = this.strings!.map(string => ({
      ...string,
      frets: (string.frets as IFret[]).map((_, index) => ({
        number: index,
        key: null,
        interval: null
      }))
    }))
  }

  stringTuned(evt: string, index: number){
    this.strings![index].key = evt;
    this._tuneStrings();
    this._highlightFrets();
    this._highlightChord(this.selectedChord!);
  }

  _tuneStrings() {
    this.strings = this.strings!.map((string, index) => this._tuneString(string));
  }

  _tuneString(string: IString) {
    let orderedNotes = this._chordinateService.orderNotesFromRoot(string.key);
    orderedNotes.forEach((note, index) => (string.frets as IFret[])[index].key = note);
    return string;
  }

}
