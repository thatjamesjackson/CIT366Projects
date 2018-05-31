import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Output() documentSelected = new EventEmitter<void>();
  constructor() {
  }

  ngOnInit() {
  }

  onSelected() {
    this.documentSelected.emit();
  }
}
