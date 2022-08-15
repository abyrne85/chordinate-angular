import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Constants } from '../constants';

@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.scss']
})
export class TunerComponent {

  @Input() selectedNote: string;
  @Output() onNoteSelected = new EventEmitter();

  notes: Array<string> = Constants.ALL_NOTES;

  constructor() { }

  noteSelected(evt) {
    this.onNoteSelected.emit(evt);
  }

}
