import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  private uid: number;

  constructor(private afs: AngularFirestore) { }

  loadMessage() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc'));
    return this.itemsCollection.valueChanges()
    .pipe(
      map( (mensajes: Message[]) =>  {
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    );
  }

  addMessage(text: string, user: string) {
    // TODO Falta el uid del usuario

    let message: Message = {
      name: user,
      message: text,
      date: new Date().getTime(),
    };

    return this.itemsCollection.add(message);
  }
}
