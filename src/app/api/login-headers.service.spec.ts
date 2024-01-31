import { TestBed } from '@angular/core/testing';

import { LoginHeadersService } from './login-headers.service';

describe('LoginHeadersService', () => {
  let service: LoginHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
