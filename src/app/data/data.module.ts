import { NgModule } from '@angular/core';
import { DatabaseModule } from './repository/database/database.module';
import { MockModule } from './repository/mock/mock.module';



@NgModule({
  declarations: [],
  imports: [ 
    DatabaseModule,
    // MockModule
  ],
})
export class DataModule { }
