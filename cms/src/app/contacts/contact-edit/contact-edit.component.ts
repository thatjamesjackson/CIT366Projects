import {Component, OnInit} from '@angular/core';
import {Contact} from "../contact.model";
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  oldContact: Contact;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) {
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

          const originalContact = this.contactService.getContact(id);
          if (originalContact == null) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(originalContact));
          if (originalContact.group != null) {
            this.contact.group = JSON.parse(JSON.stringify(originalContact.group))
          }
        }
      )
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newContact = new Contact("1", values.name, values.email, values.phone, values.imageURL, values.group);

    if (this.editMode) {
      this.contactService.updateContact(this.oldContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contact']);
  }

  onCancel() {
    this.router.navigate(['/contact']);
  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }

    if(newContact.id === this.contact.id){
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }
  addToGroup($event: any){
    let selectedContact: Contact =$event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }
  onRemoveItem(idx: number){
    if(idx < 0 || idx >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx,1);
    this.invalidGroupContact = false;
}
}
