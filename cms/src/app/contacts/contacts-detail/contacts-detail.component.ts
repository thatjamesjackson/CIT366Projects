import {Component, OnInit} from '@angular/core';
import {Contact} from "../contact.model";
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  id: number
  public contact: Contact;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contact = this.contactsService.getContact(this.id);
        }
      );

  }

  editContact() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDelete() {
    this.contactsService.deleteContact(this.contact);
    this.router.navigate(['/contact']);
  }

}
