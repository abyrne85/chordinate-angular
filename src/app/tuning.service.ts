import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constants } from './constants';
import { IChord, IScale } from './types';

@Injectable({
  providedIn: 'root'
})
export class ChordinateService {

  scale$: Observable<IScale>;
  scaleSubject: Subject<IScale>;

  chord$: Observable<IChord>;
  chordSubject: Subject<IChord>;

  constructor() {
    this.scaleSubject = new Subject<IScale>();
    this.scale$ = this.scaleSubject.asObservable();

    this.chordSubject = new Subject<IChord>();
    this.chord$ = this.chordSubject.asObservable();
  }

  setKey(scale: IScale){
    this.scaleSubject.next(scale);
  }

  getNotesInScale(key: string, scale: number[]) {
    const notesOrderedFromRoot = this.orderNotesFromRoot(key)
    return scale.map(interval => notesOrderedFromRoot[interval])
  }

  orderNotesFromRoot(key: string) {
    const keyIndex = Constants.ALL_NOTES.indexOf(key)
    return [...Constants.ALL_NOTES.slice(keyIndex, Constants.ALL_NOTES.length), ...Constants.ALL_NOTES.slice(0, keyIndex)]
  }

  getChords(key: IScale){
    const voice = this._getScaleFromVoice(key.voice);
    const intervals = key.voice === 'major' ? Constants.MAJOR_INTERVALS : Constants.MINOR_INTERVALS;
    const notesInScale = this.getNotesInScale(key.key, voice);
    return notesInScale.map((note, i) => ({root: note, voice: intervals[i]}));
  }

  setChord(chord: IChord){
    const voice = this._getScaleFromVoice(chord.voice);
    const notesInScale = this.getNotesInScale(chord.root, voice);
    chord.triad = [notesInScale[0], notesInScale[2], notesInScale[4]];
    this.chordSubject.next(chord);
  }

	_getScaleFromVoice(voice: string): number[]{
		switch (voice) {
			case 'major' : return Constants.MAJOR_SCALE;
			case 'minor' : return Constants.MINOR_SCALE;
			case 'diminished' : return Constants.DIMINISHED_SCALE;
      default: return Constants.MAJOR_SCALE;
		}
	}

}
