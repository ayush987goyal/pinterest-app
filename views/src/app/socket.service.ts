import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment.prod';

@Injectable()
export class SocketService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  addInterest(interestData: any) {
    this.socket.emit('add-interest', interestData);
  }

  getInterestAdded() {
    let observable = new Observable((observer) => {

      this.socket.on('interestAdded', (data) => {
        observer.next(data.interestData);
      })

      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }

  removeInterest(interestId: string) {
    this.socket.emit('remove-interest', interestId);
  }

  getInterestremoved() {
    let observable = new Observable((observer) => {

      this.socket.on('interestRemoved', (data) => {
        observer.next(data.interestId);
      })

    })
    return observable;
  }

  changeVote(interestId: string, userId: string[], voteCount: number) {
    let obj = {
      interestId: interestId, userId: userId, voteCount: voteCount
    };
    this.socket.emit('change-vote', obj);
  }

  getVoteChanged() {
    let observable = new Observable((observer) => {

      this.socket.on('voteChanged', (data) => {
        observer.next(data.voteDetails);
      })
    })
    return observable;
  }


}
