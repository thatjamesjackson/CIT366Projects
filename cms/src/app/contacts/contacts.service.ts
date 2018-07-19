import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class ContactsService {
  contacts: Contact[] = [];
  contactSelected = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactsId: number;

  constructor(private http:HttpClient) {
    this.maxContactsId = this.getMaxId();
    this.getContacts()
  }

  storeContacts(){
    let toServerString = JSON.stringify(this.contacts);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put("https://cit366-f06df.firebaseio.com/contacts.json", toServerString, {headers:header})
      .subscribe(
        ()=>{
          this.contactListChangedEvent.next(this.contacts.slice())
        }
      )
  }

  getContacts(): Contact[] {
    if (this.contacts.length > 0) {
      return this.contacts;
    }

    this.http.get("https://cit366-f06df.firebaseio.com/contacts.json")
      .subscribe(
        //success function
        (contacts: Contact[] ) => {
          this.contacts = contacts;
          this.maxContactsId = this.getMaxId();
          //documents = documents.sort();
          this.contactListChangedEvent.next(this.contacts);
          return this.contacts.slice();
        },
        //error
        (error: any) => {
          console.log(error);
        }
      );

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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
  }

  getContact(id: number): Contact {

    for (let contact of this.contacts) {
      if (+contact.id === id){
        return contact;
      }
    }
    return null;
  }


}
