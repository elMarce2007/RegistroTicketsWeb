import { TestBed } from '@angular/core/testing';

import { TecnicoApiService } from './tecnico-api.service';

describe('TecnicoApiService', () => {
  let service: TecnicoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnicoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
