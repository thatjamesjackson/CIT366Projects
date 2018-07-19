import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../message.model";
import {ContactsService} from "../../../contacts/contacts.service";
import {Contact} from "../../../contacts/contact.model";


@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string = "";

  constructor(private contactService: ContactsService) {
  }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(+this.message.sender);
    this.messageSender = contact.name;

  }

}
