import {Component, OnInit} from '@angular/core';
import {Document} from "../document.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DocumentsService} from "../documents.service";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  id: number;
  public document: Document;

  constructor(private documentsService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService) {
    this.nativeWindow = this.windRefService.getNativeWindow()
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.document = this.documentsService.getDocument(this.id);
        }
      );
  }

  editDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

}
