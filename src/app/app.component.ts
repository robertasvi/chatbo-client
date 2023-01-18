import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { VoiceRecognitionService } from './service/voice-recognition.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VoiceRecognitionService]
})
export class AppComponent implements OnInit {
  title = 'NextUI';
  messageArray = [];
  synth:any;
  voices:any;
  constructor(private socketService:SocketService, public service : VoiceRecognitionService) {
    this.synth = window.speechSynthesis;
    this.voices = this.synth.getVoices();
    this.service.init();
  }
  message= '';
  isSpeechRecogStarted = false;

  ngOnInit(){
    this.socketService.receivedReply().subscribe(data=> {
      this.messageArray.push({name:'Assistant', message: data.outputMessage});
      this.speak(data.outputMessage);
    });
  }

  speechRecogService(){
    if(this.isSpeechRecogStarted) {
      this.service.stop();
      this.message = this.service.text;
      this.service.text = "";
      this.isSpeechRecogStarted = false;
      this.sendMessage();
    } else if(!this.isSpeechRecogStarted) {
      this.service.start();
      this.isSpeechRecogStarted = true;
    }
  }

  sendMessage(){
    const data = { message:this.message };
    console.log('sending', data);
    if(data) {
      this.socketService.sendMessage(data);
    }
    this.messageArray.push({name:'You', message:this.message});
    this.message = '';
  }

 speak(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-US";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  this.synth.speak(u);
}

}
