import { NgModule } from '@angular/core';
import { MessageRepository } from '../../../domain/repository/message.repository';
import { MessageDataBaseRepository } from './message/message-database.repository';



@NgModule({
  declarations: [],
  imports: [ ],
  providers: [ 
    {
      provide: MessageRepository, useClass: MessageDataBaseRepository
    }
  ],
})
export class DatabaseModule { }
