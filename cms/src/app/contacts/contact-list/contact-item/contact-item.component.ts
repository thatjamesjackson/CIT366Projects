import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../contact.model";
import {ContactsService} from "../../contacts.service";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
  }

  onSelected() {
    this.contactsService.contactSelected.emit(this.contact);
  }
}
