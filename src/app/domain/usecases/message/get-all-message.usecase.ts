import { UseCase } from '../../base/use-case';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from '../../models/message.model';
import { MessageRepository } from '../../repository/message.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllMessageUseCase implements UseCase<void, MessageModel>{
    constructor( private messageRepository: MessageRepository ){}
    execute(param: void): Observable<MessageModel> {
        return this.messageRepository.getAll();
    }
}
