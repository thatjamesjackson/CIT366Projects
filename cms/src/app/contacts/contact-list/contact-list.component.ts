import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Contact} from "../contact.model";
import {ContactsService} from "../contacts.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {

  public contacts: Contact[] = [];
  private subscription: Subscription;
public term: string = "";
  constructor(private contactsService: ContactsService) {
    this.contacts = this.contactsService.getContacts()

  }

  ngOnInit() {
    ;
    this.subscription = this.contactsService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onKeyPress(value: string){
    this.term = value;
  }


}
