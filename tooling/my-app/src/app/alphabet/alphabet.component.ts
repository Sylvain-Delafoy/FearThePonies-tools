import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { translate, shiftAlphabetBy, alphabet } from '../cypher/cypher.component';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {
  fc: FormControl = new FormControl();
  processedMessage: String;
  constructor() { }

  ngOnInit() {
    this.fc.valueChanges
      .pipe(map(v => createAlphabet(v)))
      .subscribe(v => this.processedMessage = v);
  }

}

export function dedup(src: string) {
  return src.split('').reduce((str: string, v: string) => str.includes(v) ? str : str.concat(v), '');
}

export function createAlphabet(src: string) {
  const base = dedup(src);
  const start = base.charAt(base.length - 1);
  const remainder = shiftAlphabetBy(alphabet.indexOf(start));
  return dedup(base.concat(remainder));
}
