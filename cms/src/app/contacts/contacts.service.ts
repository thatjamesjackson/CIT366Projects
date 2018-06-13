import { Injectable } from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";

@Injectable()
export class ContactsService {
contacts:Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }
}
