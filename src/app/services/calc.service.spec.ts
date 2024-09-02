import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { SharedService } from './shared.service';

describe('CalcService', () => {
  let calcServ: CalcService;
  let sharedServ: SharedService;

  beforeEach(() => {
    console.log("beforeEach called in calc service");
    TestBed.configureTestingModule({
      providers: [CalcService, {
        provide: SharedService,
        useValue: jasmine.createSpyObj("SharedService", ["mySharedFunction"])
      }]
    });
    sharedServ = TestBed.inject(SharedService);
    calcServ = TestBed.inject(CalcService);
  });

  it('should be created', () => {
    expect(calcServ).toBeTruthy();
  });

  it("should multiple two numbers", () => {
    const result = calcServ.multiply(2, 3);
    expect(result).toBe(6);
  });

  it("should add two numbers", () => {
    const result = calcServ.add(2, 3);
    expect(result).toBe(5)
  });

  it("should call mySharedFunction func", () => {
    calcServ.multiply(2, 3);
    expect(sharedServ.mySharedFunction).toHaveBeenCalled();
  })
});
