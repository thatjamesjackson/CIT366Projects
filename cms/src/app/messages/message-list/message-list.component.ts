import {Component, OnInit} from '@angular/core';
import {Message} from "../message.model";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messagesService: MessagesService) {

  }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();

    this.messagesService.messageChangeEvent
      .subscribe(
        (message: Message[]) => {
          this.messages = message;
        }
      )
  }


}
