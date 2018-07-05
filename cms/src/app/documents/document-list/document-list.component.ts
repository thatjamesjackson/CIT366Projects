import {Component, OnDestroy, OnInit} from '@angular/core';
import {Document} from "../document.model";
import {DocumentsService} from "../documents.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  public documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentsService: DocumentsService) {

  }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
    this.subscription = this.documentsService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )


  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
