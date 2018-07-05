import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class ContactsService {
  contacts: Contact[] = [];
  contactSelected = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactsId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactsId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.contacts) {
      const currentId = Number(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == null) {
      return
    }

    this.maxContactsId++;
    newContact.id = String(this.maxContactsId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact,
                newContact: Contact) {
    if (originalContact == null) {
      return
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContact(id: number): Contact {
    for (let contact of this.contacts) {
      if (+contact.id === id) {
        return contact;
      }
    }
    return null;
  }


}
