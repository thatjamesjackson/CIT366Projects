import {EventEmitter, Injectable} from '@angular/core';
import {Message} from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Document} from "../documents/document.model";
import {ContactsService} from "../contacts/contacts.service";

@Injectable()
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageID: number;

  constructor(private http:HttpClient, private contactsService: ContactsService) {
    this.messages = this.initMessages();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  initMessages(): Message[] {
    this.http.get("https://cit366-f06df.firebaseio.com/messages.json")
      .subscribe(
        //success function
        (messages: Message[] ) => {
          this.messages = messages;
          this.maxMessageID = this.getMaxId();
          //documents = documents.sort();
          this.messageChangeEvent.next(this.messages.slice())
        },
        //error
        (error: any) => {
          console.log(error);
        }
      )
    return this.messages.slice();
  }
  storeMessages(){
    let toServerString = JSON.stringify(this.messages);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put("https://cit366-f06df.firebaseio.com/messages.json", toServerString, {headers:header})
      .subscribe(
        ()=>{
          this.messageChangeEvent.next(this.messages.slice())
        }
      )
  }
  getMaxId(): number {
    let maxId = 0;
    for (let mess of this.messages) {
      const currentId = Number(mess.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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
