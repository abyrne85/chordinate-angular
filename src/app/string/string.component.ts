import { Component, Input, OnInit } from '@angular/core';
import { IFret, IString } from '../types';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements OnInit {

  @Input()string: IString | undefined;
  @Input()index: number | undefined;
  constructor() { }

  ngOnInit() {
  }

  getStringWidth() {
    const width = this.index! + 1 <= 4 ? this.index! + 1 : 4;
    return `${width}px`;
  }

}
