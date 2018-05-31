import {Component, OnInit} from '@angular/core';
import {Message} from "../messages.model";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(2, "flood", "THERE IS FUDGE EVEYWHERE!!!", "cafateria staff"),
    new Message(3, "mess", "You need to clean up the mess you made", "janitorial"),
    new Message(3001, "Welcome", "Welcome to byui, this message is just here to annoy you", "Automated Sender")
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
