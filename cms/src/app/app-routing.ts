import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContactsComponent} from "./contacts/contacts.component";
import {DocumentsComponent} from "./documents/documents.component";
import {MessagesComponent} from "./messages/messages.component";
import {DocumentEditComponent} from "./documents/document-edit/document-edit.component";
import {DocumentDetailComponent} from "./documents/document-detail/document-detail.component";
import {ContactEditComponent} from "./contacts/contact-edit/contact-edit.component";
import {ContactsDetailComponent} from "./contacts/contacts-detail/contacts-detail.component";

const app_routes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {
    path: 'contact', component: ContactsComponent, children: [
      {path: 'new', component: ContactEditComponent},
      {path: ':id', component: ContactsDetailComponent},
      {path: ':id/edit', component: ContactEditComponent}
    ]
  },
  {path: 'messages', component: MessagesComponent},
  {
    path: 'documents', component: DocumentsComponent, children: [
      {path: 'new', component: DocumentEditComponent},
      {path: ':id', component: DocumentDetailComponent},
      {path: ':id/edit', component: DocumentEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
