import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { VoiceRecognitionService } from './service/voice-recognition.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [SocketService, VoiceRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
