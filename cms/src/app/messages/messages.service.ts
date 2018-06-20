import {EventEmitter, Injectable} from '@angular/core';
import {Message} from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";

@Injectable()
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice())
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice())

  }

  getMessage(id: string): Message {
    for (let mes of this.messages) {
      if (mes.id === id) {
        return mes;
      }
    }
    return null;
  }
}
