import {Component, OnInit} from '@angular/core';
import {MessagesService} from "./messages.service";
import {ContactsService} from "../contacts/contacts.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']

})
export class MessagesComponent implements OnInit {

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
  }

}
