import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CypherComponent, cypher, generateAlphabets, translate } from './cypher.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

describe('CypherComponent', () => {
  let component: CypherComponent;
  let fixture: ComponentFixture<CypherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CypherComponent
      ], imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule, MatRadioModule, MatCheckboxModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CypherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it(`should generate alphabets for some keys`, async(() => {
    expect(generateAlphabets('vigenere', 'f'))
      .toEqual(['fghijklmnopqrstuvwxyzabcdeFGHIJKLMNOPQRSTUVWXYZABCDE']);
    expect(generateAlphabets('vigenere', 'fZ')).toEqual([
      'fghijklmnopqrstuvwxyzabcdeFGHIJKLMNOPQRSTUVWXYZABCDE',
      'zabcdefghijklmnopqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXY'
    ]);
    expect(generateAlphabets('substitution', 'lesponyratucdfghijkmqvwxzb'))
      .toEqual(['lesponyratucdfghijkmqvwxzbLESPONYRATUCDFGHIJKMQVWXZB']);
  }));
  it(`should shift letters from one generated alphabet to another`, async(() => {
    const srcAlpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const dstAlpha = 'fghijklmnopqrstuvwxyzabcdeFGHIJKLMNOPQRSTUVWXYZABCDE';
    expect(translate('a', srcAlpha, dstAlpha)).toEqual('f');
    expect(translate('z', srcAlpha, dstAlpha)).toEqual('e');
    expect(translate('G', srcAlpha, dstAlpha)).toEqual('L');
  }));
  it(`should encrypt and decrypt`, async(() => {
    const srcAlpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const dstAlpha = 'fghijklmnopqrstuvwxyzabcdeFGHIJKLMNOPQRSTUVWXYZABCDE';
    expect(cypher('substitution', 'fghijklmnopqrstuvwxyzabcdeFGHIJKLMNOPQRSTUVWXYZABCDE',
      'party, party? party!', false)).toEqual('ufwyd, ufwyd? ufwyd!');
    expect(cypher('substitution', 'fghijklmnopqrstuvwxyzabcdeFGHIJKLMNOPQRSTUVWXYZABCDE',
      'ufwyd, ufwyd? ufwyd!', true)).toEqual('party, party? party!');

    expect(cypher('vigenere', 'cutiepie', 'party, party? party!', false)).toEqual('rukbc, eivvs? iivig!');
    expect(cypher('vigenere', 'cutiepie', 'rukbc, eivvs? iivig!', true)).toEqual('party, party? party!');
  }));

});
