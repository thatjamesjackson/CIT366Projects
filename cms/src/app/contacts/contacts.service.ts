import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";

@Injectable()
export class ContactsService {
  contacts: Contact[] = [];
  contactSelected = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string):Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

}
