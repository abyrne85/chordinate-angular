export interface ITuning {
  id: number,
  key: string
}

export interface IString {
  id: number,
  key: string,
  frets?: Array<IFret>
}

export interface IFret {
  number: number,
  key: string | null,
  interval: string | null,
  inScale?: boolean,
  inChord?: boolean,

}

export interface IScale {
  key: string;
  voice: 'major' | 'minor';
  selected?: boolean;
}

export interface IChord {
  root: string;
  interval: number;
  voice: 'major' | 'minor';
  selected?: boolean;
  triad?: string[];
}
