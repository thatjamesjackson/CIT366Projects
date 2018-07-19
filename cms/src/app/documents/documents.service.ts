import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";


@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentsId: number;

  constructor(private http:HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentsId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get("https://cit366-f06df.firebaseio.com/documents.json")
      .subscribe(
        //success function
        (documents: Document[] ) => {
          this.documents = documents;
          this.maxDocumentsId = this.getMaxId();
          //documents = documents.sort();
          this.documentListChangedEvent.next(this.documents.slice())
        },
        //error
      (error: any) => {
          console.log(error);
    }
      )
    return this.documents.slice();
  }
storeDocuments(){
    let toServerString = JSON.stringify(this.documents);
  let header = new HttpHeaders({
    "Content-Type":"application/json"
  });
  this.http.put("https://cit366-f06df.firebaseio.com/documents.json", toServerString, {headers:header})
    .subscribe(
      ()=>{
        this.documentListChangedEvent.next(this.documents.slice())
      }
    )
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document == null) {
      return
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }
}
