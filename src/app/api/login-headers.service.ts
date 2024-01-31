import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginHeadersService {

  constructor() { }

  private areButtonsHidden = false;

  getButtonsHiddenState() {
    return this.areButtonsHidden;
  }

  setButtonsHiddenState(state: boolean) {
    this.areButtonsHidden = state;
  }
}
