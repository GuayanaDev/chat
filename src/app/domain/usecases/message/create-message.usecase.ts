import { UseCase } from '../../base/use-case';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from '../../models/message.model';
import { MessageRepository } from '../../repository/message.repository';

@Injectable({
    providedIn: 'root'
})

export class CreateMessageUseCase implements UseCase<MessageModel, MessageModel>{
    constructor( private messageRepository: MessageRepository ){}
    execute(param: MessageModel): Observable<MessageModel> {
        return this.messageRepository.create(param);
    }
}
