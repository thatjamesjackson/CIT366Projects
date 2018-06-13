import {Component, OnInit} from '@angular/core';

import {Document} from "./document.model";
import {DocumentsService} from "./documents.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentsService: DocumentsService) {
  }

  ngOnInit() {
    this.documentsService.documentSelectedEvent
      .subscribe(
        (document: Document) => {
          this.selectedDocument = document;
        }
      )
  }

}
