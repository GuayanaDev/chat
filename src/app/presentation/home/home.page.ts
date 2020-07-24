import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { MessageModel } from '../../domain/models/message.model';
import { CreateMessageUseCase } from '../../domain/usecases/message/create-message.usecase';
import { GetAllMessageUseCase } from '../../domain/usecases/message/get-all-message.usecase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: MessageModel[];
  mensaje = '';
  user = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(private createMessage: CreateMessageUseCase, private getAllMessage: GetAllMessageUseCase) {
    this.getMessages();
  }

  getMessages(){
    this.items = [];
    this.getAllMessage.execute(null).subscribe((message: MessageModel) => {
      const hasMessage = this.items.find(item => item.date === message.date);
      if (!hasMessage) { this.items.push(message); }
    }, err => {
      console.log('Error al cargar los mensaje: ', err);
    });
  }

  sendMessage(){
    console.log(this.mensaje);
    if (this.mensaje.length === 0 && this.user.length === 0) {
      return;
    }
    const message: MessageModel = {
      name: this.user,
      message: this.mensaje,
      date: new Date().getTime(),
      id: '',
      user: ''
    };

    this.createMessage.execute(message).subscribe(value => {
      if (value) {
        console.log('Mensaje creado');
        this.getMessages();
      } else {
        console.log('Error al enviar el mensaje');
      }
    }, err => {
      console.log('Error al crear el mensaje: ', err);
    });

    this.mensaje = '';
    setTimeout(() => {
      this.content.scrollToBottom(500);
    }, 300);
  }
}
