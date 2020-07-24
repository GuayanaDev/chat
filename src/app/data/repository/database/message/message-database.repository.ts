import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MessageDataBaseRespositoryMapper } from './message-database-repository-mapper';
import { MessageRepository } from 'src/app/domain/repository/message.repository';
import { MessageModel } from 'src/app/domain/models/message.model';
import { MessageEntity } from './message-database-entity';

@Injectable({
    providedIn: 'root'
})
export class MessageDataBaseRepository extends MessageRepository{
    private mapper = new MessageDataBaseRespositoryMapper();
    constructor(private afs: AngularFirestore) {
        super();
    }

    create(message: MessageModel): Observable<MessageModel> {
        const messageRef = this.afs.collection<MessageEntity>('chats');
        return from(messageRef.add(this.mapper.mapTo(message)).then(ref => {
            message.id = ref.id;
            return message;
        }));
    }

    getAll(): Observable<MessageModel> {
        const messageRef = this.afs.collection<MessageEntity>('chats', ref => ref.orderBy('date', 'asc'));
        return messageRef.valueChanges({idField: 'id'})
                .pipe(
                    flatMap(items => {
                        if (items.length) {
                            return items;
                        } else {
                            throw new Error('No existen mensajes');
                        }
                    })
                )
                .pipe(
                    map(this.mapper.mapFrom)
                );
    }
}
