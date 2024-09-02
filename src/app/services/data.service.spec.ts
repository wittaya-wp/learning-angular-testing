import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { USERS } from '../mock/user';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;
  const url = 'https://jsonplaceholder.typicode.com/users'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get all users", () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(USERS.length);
      const secondUser = users.find((user: any) => user.id === 2);
      expect(secondUser.name).toBe("Ervin Howell");
    });
    const mockReq = testingController.expectOne(url);
    expect(mockReq.request.method).toEqual('GET')
    mockReq.flush(Object.values(USERS))
  })

  it("should get users by id", () => {
    const id = 2
    service.getUserById(id).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.name).toBe("Leanne Graham");
    });
    const mockReq = testingController.expectOne(`${url}/${id}`);
    expect(mockReq.request.method).toEqual('GET')
    mockReq.flush(USERS[0])
  });

  it("should update users by id", () => {
    const id = 3
    const body = {
      id: 3,
      name: 'Clementine Bauch2',
      username: 'Samantha2',
    }
    service.updateUser(id, body).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.id).toBe(3);
      expect(user.name).toBe(body.name);
      expect(user.username).toBe(body.username);
    });
    const mockReq = testingController.expectOne(`${url}/${id}`);
    expect(mockReq.request.method).toEqual('POST');
    let modifiedUser = USERS[2];
    modifiedUser = {
      ...modifiedUser,
      ...body
    }
    mockReq.flush(modifiedUser)
  });

  afterEach(() => {
    testingController.verify();
  });
});
