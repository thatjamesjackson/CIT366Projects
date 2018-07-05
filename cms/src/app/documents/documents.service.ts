import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentsId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentsId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  oldDeleteDocument(document: Document) {
    if (document === null) {
      return
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  getDocument(id: number): Document {
    for (let doc of this.documents) {
      if (+doc.id === id) {
        return doc;
      }
    }
    return null;
  }
  ;

  getMaxId(): number {
    let maxId = 0;
    for (let doc of this.documents) {
      const currentId = Number(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null) {
      return
    }

    this.maxDocumentsId++;
    newDocument.id = String(this.maxDocumentsId);
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(oldDocument: Document,
                 newDocument: Document) {
    if (oldDocument == null) {
      return
    }

    const pos = this.documents.indexOf(oldDocument);
    if (pos < 0) {
      return
    }

    newDocument.id = oldDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);

  }

  deleteDocument(document: Document) {
    if (document == null) {
      return
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents = this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);

  }
}
