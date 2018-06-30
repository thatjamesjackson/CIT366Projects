import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";

import {DocumentsService} from "../documents.service";
import {Document} from "../document.model";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  oldDocument: Document;
  editMode: boolean = false;

  constructor(private documentsService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = +params['id'];
          if (id == null) {
            this.editMode = false;
            return;
          }

          this.oldDocument = this.documentsService.getDocument(id);
          if (this.oldDocument == null) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.oldDocument));
        }
      )

  }


  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document("1", value.name, value.url, null);

    if (this.editMode) {
      this.documentsService.updateDocument(this.oldDocument, this.document);
    } else {
      this.documentsService.addDocument(this.document);
      this.router.navigate(['/documents']);
    }
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
