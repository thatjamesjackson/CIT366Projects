import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactListComponent} from './contacts/contact-list/contact-list.component';
import {ContactsDetailComponent} from './contacts/contacts-detail/contacts-detail.component';
import {HeaderComponent} from "../header/header.component";
import {ContactItemComponent} from './contacts/contact-list/contact-item/contact-item.component';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentListComponent} from './documents/document-list/document-list.component';
import {DocumentDetailComponent} from './documents/document-detail/document-detail.component';
import {DocumentItemComponent} from './documents/document-list/document-item/document-item.component';
import {MessageItemComponent} from './messages/message-list/message-item/message-item.component';
import {MessageEditComponent} from './messages/message-list/message-edit/message-edit.component';
import {MessageListComponent} from './messages/message-list/message-list.component';
import {MessagesComponent} from './messages/messages.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import {AppRoutingModule} from "./app-routing";
import {DocumentViewComponent} from './documents/document-view/document-view.component';
import {DocumentEditComponent} from './documents/document-edit/document-edit.component';
import {WindRefService} from "./wind-ref.service";
import {ContactEditComponent} from './contacts/contact-edit/contact-edit.component';
import {DndModule} from 'ng2-dnd';
import {FormsModule} from "@angular/forms";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import {HttpClientModule} from "@angular/common/http";
import {ContactsService} from "./contacts/contacts.service";
import {MessagesService} from "./messages/messages.service";
import {DocumentsService} from "./documents/documents.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentItemComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    MessagesComponent,
    DropdownDirective,
    DocumentViewComponent,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DndModule.forRoot(),
    FormsModule
  ],
  providers: [WindRefService, ContactsService, MessagesService, DocumentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
