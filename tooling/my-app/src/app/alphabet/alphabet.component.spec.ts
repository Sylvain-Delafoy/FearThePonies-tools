import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetComponent, dedup, createAlphabet } from './alphabet.component';
import { MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AlphabetComponent', () => {
  let component: AlphabetComponent;
  let fixture: ComponentFixture<AlphabetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetComponent ],
      imports: [ MatInputModule, ReactiveFormsModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should remove duplicates', () => {
    expect(dedup('hi')).toEqual('hi');
    expect(dedup('hop')).toEqual('hop');
    expect(dedup('trololo')).toEqual('trol');
    expect(dedup('mysecret')).toEqual('mysecrt');
  });
  it('should create alphabets', () => {
    expect(createAlphabet('mysecret')).toEqual('mysecrtuvwxzabdfghijklnopq');
  });
});
