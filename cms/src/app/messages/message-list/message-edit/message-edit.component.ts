import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../messages.model";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  public currentSender:string = "James Jackson";

  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  addMessageEvent = new EventEmitter<Message>();


  constructor() { }

  ngOnInit() {
  }

  onSendMessage(){
    const subjectConst = this.subjectRef.nativeElement.value;
    const msgTextConst = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(1, subjectConst, msgTextConst, this.currentSender);
  this.addMessageEvent.emit(newMessage);
  }

  onClear(){
this.subjectRef.nativeElement.value = "";
this.msgTextRef.nativeElement.value ="";
  }

}
