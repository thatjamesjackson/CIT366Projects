import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../../contacts/contact.model";

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  constructor() { }

  ngOnInit() {
  }

}
