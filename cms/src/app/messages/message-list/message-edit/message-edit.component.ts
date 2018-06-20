import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../message.model";
import {MessagesService} from "../../messages.service";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  public currentSender: string = "1";

  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;


  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
  }

  onSendMessage() {
    const subjectConst = this.subjectRef.nativeElement.value;
    const msgTextConst = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('1', subjectConst, msgTextConst, this.currentSender);
    this.messagesService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
