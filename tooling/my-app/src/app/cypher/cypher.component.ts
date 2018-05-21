import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Observable, combineLatest, of, concat } from 'rxjs';

@Component({
  selector: 'app-cypher',
  templateUrl: './cypher.component.html',
  styleUrls: ['./cypher.component.css']
})
export class CypherComponent implements OnInit {
  fc: FormGroup; // <--- heroForm is of type FormGroup
  sourceLabel: string = '1';
  targetLabel: string = '2';
  processedMessage: string;

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.createForm();
  }

  createForm() {
    this.fc = this.fb.group({
      codedMessage: `oj xznx zs ljsynq utzqjy!`,
      sourceAlphabet: 'fghijklmnopqrstuvwxyzabcde',
      style: 'substitution',
      decode: true
    });
  }

  ngOnInit() {
    const decode$ = watchValues(this.fc.controls.decode);
    decode$.subscribe(v => this.updateTitles(v));
    watchValues(this.fc).subscribe((value) => {
      const [message, password, algorithm, decode] = [value.codedMessage, value.sourceAlphabet, value.style, value.decode];
      this.processedMessage = cypher(algorithm, password, message, decode);
    });
  }



  private updateTitles(decode: Boolean) {
    if (decode) {
      this.sourceLabel = 'Message chiffré';
      this.targetLabel = 'Message clair';
    } else {
      this.sourceLabel = 'Message clair';
      this.targetLabel = 'Message chiffré';
    }
  }
}


function decodeWord(message: String, decode: Boolean, passwordAlphabets: String[]) {
  return (function () {
    let final = '';
    for (let idx = 0, pwdIdx = 0; idx < message.length; idx++) {
      const sourceCharacter = message[idx];
      let c;
      if (decode) {
        c = translate(sourceCharacter, passwordAlphabets[pwdIdx], bothCaseAlphabet);
      } else {
        c = translate(sourceCharacter, bothCaseAlphabet, passwordAlphabets[pwdIdx]);
      }
      if (bothCaseAlphabet.includes(sourceCharacter)) {
        pwdIdx = (pwdIdx + 1) % passwordAlphabets.length;
      }
      final += c;
    }
    return final;
  })();
}
export const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const bothCaseAlphabet = fullize(alphabet);

function fullize(s: String) {
  return s.toLowerCase() + s.toUpperCase();
}
function watchValues(c: AbstractControl): Observable<any> {
  return concat(of(c.value), c.valueChanges);
}

export function translate(sourceCharacter: any, sourceAlphabet: String, targetAlphabet: String) {
  const idx = sourceAlphabet.indexOf(sourceCharacter);
  const nextLetter = idx >= 0 ? targetAlphabet[idx] : sourceCharacter;
  return nextLetter;
}

export function cypher(algorithm: 'vigenere'|'substitution', password: String, message: String, decode: boolean) {
  const passwordAlphabets: String[] = generateAlphabets(algorithm, password);
  const final = decodeWord(message, decode, passwordAlphabets);
  return final;
}


export function shiftAlphabetBy(currShift: number): string {
  return alphabet.substring(currShift) + alphabet.substring(0, currShift);
}
export function generateAlphabets(algorithm: 'vigenere'|'substitution', password: String): String[] {

  let passwordAlphabets: String[];
  switch (algorithm) {
    case 'vigenere':
      passwordAlphabets = password.split('').map(currKey => {
        const currShift = alphabet.toLowerCase().indexOf(currKey.toLowerCase());
        return fullize(shiftAlphabetBy(currShift));
      });
      break;
    case 'substitution':
    default:
      passwordAlphabets = [fullize(password)];
      break;
  }
  return passwordAlphabets;
}
