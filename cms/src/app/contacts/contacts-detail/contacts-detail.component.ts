import {Component, OnInit} from '@angular/core';
import {Contact} from "../contact.model";

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  public contact: Contact;

  constructor() {
  }

  ngOnInit() {
  }

}
