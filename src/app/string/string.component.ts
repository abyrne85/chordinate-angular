import { Component, Input, OnInit } from '@angular/core';
import { IFret, IString } from '../types';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent {

  @Input()string: IString | undefined;
  @Input()index: number | undefined;
  constructor() { }

  getStringWidth() {
    const width = this.index! + 1 <= 4 ? this.index! + 1 : 4;
    return `${width}px`;
  }

  getIntervalClass(fret: IFret) {
    return {
      'string__note--root' : fret.interval === 1,
      'string__note--inScale' : fret.inScale,
      'string__note--inChord' : fret.inChord,
    };
  }

}
