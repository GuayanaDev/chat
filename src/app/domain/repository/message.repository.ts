import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';

export abstract class MessageRepository {
    abstract create(param: MessageModel): Observable<MessageModel>;
    abstract getAll(): Observable<MessageModel>;
}
