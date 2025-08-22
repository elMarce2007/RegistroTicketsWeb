import { TestBed } from '@angular/core/testing';

import { TecnicosApiService } from './tecnicos-api.service';

describe('TecnicosApiService', () => {
  let service: TecnicosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnicosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
