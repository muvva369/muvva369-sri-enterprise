import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return User', () => {
    const result = service.getUser('muv');
    result.subscribe((user:any)=>{
      expect(user).toContain('name');
    })
  });

  it('should return error when no user found', () => {
    const result = service.getUser('asnwbjolwqdo');
    result.subscribe((user:any)=>{
      expect(user).toContain('errorMessage');
    })
  });
});
