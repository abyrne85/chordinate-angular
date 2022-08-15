import { Constants } from './../constants';
import { Component, OnInit } from '@angular/core';

interface ITuning {
  id: number,
  key: string
}

interface IString {
  id: number,
  key: string,
  frets?: Array<IFret>
}

interface IFret {
  number: number,
  active: boolean,
  key: string | null,
  interval: string | null,
}

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit {

  tuning: Array<ITuning> = Constants.STANDARD_TUNING.map((key, id) => ({ id, key }));
  strings: Array<IString> = Constants.STANDARD_TUNING.map((key, id) => ({ id, key, frets: [] }));
  constructor() { }

  ngOnInit() {
    this._populateFrets();
    // this._tuneStrings();
  }

  _populateFrets() {
    console.log('popukate frets')
    Array(12).map((_, index) => console.log(index))
    this.strings = this.strings.map(string => ({
      ...string,
      frets: new Array(12).map((_, index) => {
        return {
          number: index,
          active: false,
          key: null,
          interval: null
        }
      })
    }))
    console.log(this.strings);
  }

  tuneString(string: IString, tuning: ITuning) {
    let orderedNotes = this._orderNotesFromRoot(tuning.key);
    orderedNotes.forEach((note, index) => string.frets[index].key = note);
    console.log(string);
    return string;
  }

  _tuneStrings() {
    this.strings = this.strings.map((string, index) => this.tuneString(string, this.tuning[index]));
  }

  _getNotesInScale(key, scale) {
    const notesOrderedFromRoot = this._orderNotesFromRoot(key)
    return scale.map(interval => notesOrderedFromRoot[interval])
  }

  _orderNotesFromRoot(key) {
    const keyIndex = Constants.ALL_NOTES.indexOf(key)
    return [...Constants.ALL_NOTES.slice(keyIndex, Constants.ALL_NOTES.length), ...Constants.ALL_NOTES.slice(0, keyIndex)]
  }

}
