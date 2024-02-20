import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Character } from '../models';
import { detailsResolver } from './details.resolver';

describe('detailsResolver', () => {
  const executeResolver: ResolveFn<Character> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => detailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
