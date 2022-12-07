import { Component, Input, OnInit } from '@angular/core';
import { IFret } from '../types';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements OnInit {

  @Input()frets: IFret[] | unknown;
  constructor() { }

  ngOnInit() {
  }

}
