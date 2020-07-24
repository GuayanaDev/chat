import { Mapper } from '../../../../domain/base/mapper'
import { MessageEntity } from './message-database-entity';
import { MessageModel } from '../../../../domain/models/message.model';

export class MessageDataBaseRespositoryMapper implements Mapper<MessageEntity, MessageModel>{

    mapFrom(param: MessageEntity): MessageModel {
        return {
            name: param.name,
            message: param.message,
            date: param.date,
            id: param.uid,
            user: param.user
        };
    }

    mapTo(param: MessageModel): MessageEntity {
        return {
            name: param.name,
            message: param.message,
            date: param.date,
            uid: param.id,
            user: param.user
        };
    }
}
