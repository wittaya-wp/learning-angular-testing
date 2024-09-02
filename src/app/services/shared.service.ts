import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
    console.log("Shared = created");
   }

  mySharedFunction() {
    console.log("Shared function called");
  }
}
