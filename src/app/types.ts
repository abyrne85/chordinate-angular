export interface ITuning {
  id: number,
  key: string
}

export interface IString {
  id: number,
  key: string,
  frets?: Array<IFret> | unknown
}

export interface IFret {
  number: number,
  key: string | null,
  interval?: number,
  inScale?: boolean,
  inChord?: boolean,
  extensions?: IExtensions
}

export interface IScale {
  key: string;
  voice: 'major' | 'minor';
  selected?: boolean;
}

export interface IChord {
  root: string;
  voice: string;
  intervals?: string[];
  selected?: boolean;
  triad?: string[];
}

export interface IExtensions {
  seventh: boolean;
  ninth: boolean
}
