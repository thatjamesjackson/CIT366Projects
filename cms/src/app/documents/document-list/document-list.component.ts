import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Document} from "../document.model";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("1", "Memo", "A memo", "www.google.com", null),
    new Document("2", "Memo2", "Another memo", "www.gmail.com", null),
    new Document("3", "Terms of Service", "No one will read this", "www.tms.com", null),
    new Document("99", "Instructions", "Blah Blah Blah, nothing useful.", "www.inst.com", null)
  ];

  constructor() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  ngOnInit() {
  }

}
